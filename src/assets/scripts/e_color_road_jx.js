/* eslint-disable */
e_color = new Object;
e_color.ealpha = 0.5;
e_color.inneralpha = 0.8;
e_color.arrlist = [
    ["255", "0", "0"], 
    ["255", "255", "0"],
    ["0", "0", "255"],
    ["0", "255", "0"],
    ["160","32","240"],
    ["255", "165", "10"],
    ["0","0","0"],
    ["255", "192", "203"], 
    ["104","131","139"],  	  
];
// e_color.selcolor = function (type) {
//     return e_color.arrlist[type - 1];
// }
e_color.selcolor=function(type){
    var colorval=0;
    switch(type){
        case "road":
        case "sidewalk":
        case "parking":
        case "rail track":
            colorval=0;
            break;
        case "person":
        case "rider":
            colorval=1;
            break;
        case "car":
        case "truck":
        case "bus":
        case "on rails":
        case "motorcycle":
        case "bicycle":
        case "caravan":
        case "trailer":
            colorval=2;
            break;
        case "building":
        case "wall":
        case "fence":
        case "guard rail":
        case "bridge":
        case "tunnel":
        case "garage":
            colorval=3;
            break;
        case "pole":
        case "pole group":
        case "traffic sign":
        case "traffic light":
        case "banner":
        case "billboard":
        case "street light":
        case "traffic device":
        case "lane divider":
        case "traffic sign frame":
        case "parking sign":
        case "traffic cone":
            colorval=4;
            break;
        case "vegetation":
        case "terrain":
            colorval=5;
            break;
        case "sky":
            colorval=6;
            break;
        case "ground":
        case "dynamic":
        case "static":
            colorval=7;
            break;
        default:
            colorval=0;
            break; 
    }
    
    return e_color.arrlist[colorval];

}
e_color.findid = function (r, g, b) {
    if (r == 0) {
        return -1;
    }
    var eColor=e_color;
    var i=eColor.arrlist.length-1;
    var listA=eColor.arrlist;
	while(i>=0){
		var rNumber=listA[i][0],gNumber=listA[i][1],bNumber=listA[i][2];
        if (Number(rNumber) == r && Number(gNumber) == g && Number(bNumber) == b) {
            return i;
        }
		i--;
	}
    // for (; i >=0; i--) {
        // var rNumber=listA[i][0],gNumber=listA[i][1],bNumber=listA[i][2];
        // if (Number(rNumber) == r && Number(gNumber) == g && Number(bNumber) == b) {
            // return i;
        // }
    // }
    return -1;
}