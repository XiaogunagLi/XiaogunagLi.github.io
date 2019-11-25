var sources = ["img/1.jpg", "img/2.jpg"];
var images = new Array();
function start(){
	initial();
	var main = new Scene(0, 0, 100, 100);
	stage.addScene(main);

	var img1 = new ISprite(images[0], 0, 0);
	img1.alpha = 0;
	main.add(img1);
	
	var row = 4;
	var col = 4;
	var img2 = new ISprite(images[1], 0, 0);
	var img2Crop = crop(img2, row, col);
	img2Crop.alpha = 0;
	main.add(img2Crop);
	
	var synQueue = new SynQueue();
	
	
	synQueue.add(new Fade(img2Crop, 1, 1000, null, null));
	synQueue.add(new Fade(img1, 1, 30, null, null));
	
	var batchQueue = new SynQueue();
	synQueue.add(batchQueue);
	
	var arr=[];
    for(var i=0;i<row*col;i++){
            arr[i]=i;
    }
    arr.sort(function(){ return 0.5 - Math.random() })
	for(var i=0; i<arr.length; i++){
		batchQueue.add(new Flip(img2Crop.items[arr[i]], 90, 90, 300, null, null));
	}
	
	synQueue.add(new Scale(img1, -0.7, -0.7, 500, null, null));
	
	var time = 400;
	batchQueue = new BatchQueue();
	batchQueue.add(new Fade(img1, -0.9, time, null, null));
	batchQueue.add(new Scale(img1, -0.05, -0.05, time, null, null));
	synQueue.add(batchQueue);
	
	batchQueue = new BatchQueue();
	batchQueue.add(new Fade(img1, 0.9, time, null, null));
	batchQueue.add(new Scale(img1, 0.05, 0.05, time, null, null));
	synQueue.add(batchQueue);
	
	synQueue.add(new Scale(img1, 0.7, 0.7, 1000, null, null));

	tween.add(synQueue);
}

function next(args){
	
}