function crop(obj, row, col){
	var c = document.createElement('canvas');
	c.width = obj.getW();
	c.height = obj.getH();
	var ctx2 = c.getContext('2d');
	ctx2.drawImage(obj.img, 0, 0, obj.getW(), obj.getH());


	var w = Math.floor(obj.getW()/col);
	var h = Math.floor(obj.getH()/row);
	var result = new Layer(0, 0, 0, 0);
	for(var i=0; i<row; i++){
		for(var j=0; j<col; j++){
			var imgData = ctx2.getImageData(j*w, i*h, w, h);
			var img = cropImage(imgData, w, h);
			
			var x, y;
			if(col%2 != 0){
				x = (j-(col-1)/2)*w;
			}else{
				x = w/2 + (j-col/2)*w;
			}
			if(row%2 != 0){
				y = (i-(row-1)/2)*h;
			}else{
				y = h/2 + (i-row/2)*h;
			}
			var item = new ISprite(img, x, y);
			result.add(item);
		}
	}
	return result;
}
		
function cropImage(data,width, height){
	var c = document.createElement('canvas');
	c.width = width;
	c.height = height;
	var ctx2 = c.getContext('2d');
	ctx2.putImageData(data, 0, 0);
	var img = document.createElement('img');
	img.src = c.toDataURL('image/jpeg', 1);
	//document.getElementById("bd").appendChild(img);
	return img;
}	