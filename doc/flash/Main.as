package
{
	import flash.display.MovieClip;
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.media.SoundChannel;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	import flash.net.URLLoader;
	import flash.net.URLVariables;
	import flash.events.IOErrorEvent;
	import flash.media.Sound;
	import flash.media.SoundLoaderContext;
	
	import flash.external.ExternalInterface;
	import flash.events.Event;
	import flash.events.TimerEvent;
	
	import flash.media.SoundTransform;
	import flash.system.Security;
	
	public class Main extends MovieClip
	{
		
		private var _params:Object;
		private var _interface:String = null;
		
		private var _sound:Sound;
		private var _channel:SoundChannel;
		private var _soundTime:Timer = new Timer(200);
		private var _soundProgressTime:Timer = new Timer(500);
		
		private var _loadedBytes:int;
		private var _totalBytes:int;
		private var _progress:Number;
		private var _totalLength:Number;
		
		private var _pausePosition:Number = 0;
		private var _play_status:String = "stop"; // pause , playing
		
		private var buffer:SoundLoaderContext = new SoundLoaderContext(3000);
		private var firstTime:Boolean = true;
		private var loadedBytes:int;
		private var totalBytes:int;
		private var volumeTransform:SoundTransform;
		private var valumeValue:Number = 1;
		private var mp3Url:String;
		
		//private var //_timer:Timer = new Timer(250);
		private var getListenerLoged:Boolean = false;
		
		public function Main()
		{
			Security.allowDomain("*");
			Security.allowInsecureDomain("*")
			
			volumeTransform = new SoundTransform();
			if (ExternalInterface.available)
			{
				try
				{
					ExternalInterface.addCallback("jsPlay", musicPlay);
					ExternalInterface.addCallback("jsPause", musicPause);
					ExternalInterface.addCallback("jsRePlay", musicRePlay);
					ExternalInterface.addCallback("jsStop", musicStop);
					ExternalInterface.addCallback("jsSrc", musicSrc);
					ExternalInterface.addCallback("jsPosition", musicPosition);
					ExternalInterface.addCallback("setVolume", SetVolume);
					onreadyCallback(true);
				}
				catch (e)
				{
					onreadyCallback(false);
				}
				;
			}
			
			getInterface();
		
		}
		
		private function onreadyCallback(val:Boolean):void
		{
			debug("onreadyCallback", val);
		}
		
		private function getInterface():void
		{
			_params = this.loaderInfo.parameters;
			if (_params.xplayerinterface)
			{
				_interface = _params.xplayerinterface
			}
		}
		
		public function musicSrc(url:String):void
		{
			mp3Url = url;
			if (firstTime)
			{
				firstTime = false;
			}
			else
			{
				musicStop();
			}
		}
		
		public function musicPlay():void
		{
			if (firstTime) return void;
			if (_play_status == "play")
				return void;
			if (_play_status == "pause")
			{
				musicRePlay();
				return void;
			}
			try
			{
				_channel.stop();
				_channel.removeEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
			}
			catch (e)
			{
			}
			
			_sound = new Sound();
			var mp3Url:URLRequest = new URLRequest(mp3Url);
			mp3Url.method = URLRequestMethod.POST;
			
			_sound.load(mp3Url, buffer);
			_sound.addEventListener(Event.OPEN, soundOpenHandler);
			_sound.addEventListener(IOErrorEvent.IO_ERROR, errorHandler);
			_sound.addEventListener(Event.COMPLETE, loadCompleteHandler);
			
			_play_status = "play"
			
			_channel = _sound.play(_pausePosition);
			_channel.addEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
			SetVolume(valumeValue);
		}
		
		public function musicStop()
		{
			_play_status = "stop"
			_pausePosition = 0;
			try {
				_channel.stop();
				_channel.removeEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
			}catch(e){}
			try {
				_soundTime.stop();
				_soundTime.removeEventListener(TimerEvent.TIMER, timeupdateHandler);
			}catch(e){}
		}
		
		public function musicPause()
		{
			if (firstTime) return void;
			_play_status = "pause"
			_pausePosition = _channel.position;
			_channel.stop();
			_soundTime.stop();
			_soundTime.removeEventListener(TimerEvent.TIMER, timeupdateHandler);
		}
		
		public function musicRePlay():void
		{
			_channel.stop();
			_play_status = "play"
			_channel = _sound.play(_pausePosition);
			_channel.addEventListener(Event.SOUND_COMPLETE, soundCompleteHandler);
			
			_soundTime.start();
			_soundTime.addEventListener(TimerEvent.TIMER, timeupdateHandler);
			
			SetVolume(valumeValue);
		}
		
		public function SetVolume(val:Number = 0.5):void
		{
			try
			{
				valumeValue = val;
				volumeTransform.volume = val;
				_channel.soundTransform = volumeTransform;
			}
			catch (e)
			{
			}
		}
		
		public function musicPosition(val:Number):void {
			debug(val)
			if (_play_status == "play")
			{
				musicPause();
				_pausePosition = val;
				musicRePlay();
			}else {
				_pausePosition = val;
			}
		}
		
		private function errorHandler(event:Event = null ) :void
		{
			if (_interface) {
				ExternalInterface.call("window." + _interface + ".error");
			}
		}
		
		private function loadCompleteHandler(event:Event = null):void
		{
			_sound.removeEventListener(Event.OPEN, soundOpenHandler);
			_sound.removeEventListener(IOErrorEvent.IO_ERROR, errorHandler);
			_sound.removeEventListener(Event.COMPLETE, loadCompleteHandler);
			
			_soundProgressTime.removeEventListener(TimerEvent.TIMER, progressHandler);
			_soundProgressTime.stop();
			
			_progress = _sound.length;
			ExternalInterface.call("window." + _interface + ".progress", {
				"progress" : _progress,
				"duration": _sound.length
			});
		}
		
		private function soundCompleteHandler(event:Event = null):void
		{
			musicStop();
			if (_interface) {
				ExternalInterface.call("window." + _interface + ".ended");
			}
		}
		
		private function soundOpenHandler(event:Event = null):void {
			_totalLength = 0;
			_progress = 0;
			_soundTime.addEventListener(TimerEvent.TIMER, timeupdateHandler);
			_soundTime.start();
			_soundProgressTime.addEventListener(TimerEvent.TIMER, progressHandler);
			_soundProgressTime.start();
		}
		
		private function timeupdateHandler(event:TimerEvent):void {
			if (_interface) {
				ExternalInterface.call("window." + _interface + ".timeupdate", {
					"currentTime" : _channel.position,
					"duration": _sound.length
				});
			}
		}
		
		private function progressHandler(event:TimerEvent = null):void {
			if (_interface) {
				_loadedBytes = _sound.bytesLoaded;
				_totalBytes = _sound.bytesTotal;
				_progress = _sound.length;
				if (_totalLength == 0 && _progress > 2000)
				{
					_totalLength = (_progress * _totalBytes) / _loadedBytes; // 预算时间
				}
				ExternalInterface.call("window." + _interface + ".progress", {
					"progress" : _progress,
					"duration": _totalLength
				});
			}
		}
		
		private function debug(... args):void
		{
			trace(args.join(" "));
			//ExternalInterface.call("console.log", args.join(" "));
		}
	}
}