$(function(){
	
	var data=JSON.parse($("#data").text());
	
	var mapped=$.map(data,function(item){
		return new Word(item);
	});
	
	function Word(obj){
		var self=this;
		this.word=ko.observable(obj.word);
		this.def=ko.observable(obj.definition);
		
	}
	function viewModel(x){
		var self=this;
		self.words=ko.observableArray(x);
		self.currentIndex=ko.observable(0);
		self.total=ko.observable(data.length);
		self.currentWord=ko.computed(function(){
			return self.words()[self.currentIndex()];
		});		
		
		self.flip=function(){
			$(".flipper").toggleClass('flip');
		};
		/* Next Word */
		self.next=function(item){		
			if(self.currentIndex()==self.total()-1)
				return ;
			self.currentIndex(self.currentIndex()+1);						
			if(self.total()-self.currentIndex() ==4)
				self.getWords();
		};		
		
		/* Previous Word */
		self.prev=function(item){
			if(self.currentIndex()==0)
				return ;
			self.currentIndex(self.currentIndex()-1);
		};
		
		
		/* Get next set of 10 words */
		self.getWords=function(){
			$.ajax({
            url: "/",
            type: 'POST',            
            contentType: 'application/json; charset=utf-8',
            dataType:'text',
        }).done(function( data ) {
			data=JSON.parse(data);
			var newTotal=self.total()+data.length;
			for(x in data)
			{
				self.words.push(new Word(data[x]));
				
			}
			self.total(newTotal);
		})
		
		};
		/* Arrow Navigation */
		$("body").bind('keydown',function(e){		
		if(e.keyCode==32)
			self.flip();
		if(e.keyCode==39)
			self.next();
		if(e.keyCode==37)
			self.prev();	
		});
		
	}
	
	ko.applyBindings(new viewModel(mapped));
	
});