package com.ekr.pe.selector.view.statusbar
{
	public class Person implements IPaolo, IAurora
	{
		public var gender:String = "";
		public var age:int = 0;
		
		public function Person()
		{
			gender = GenderTypes.MALE;
			
		}
	}
}