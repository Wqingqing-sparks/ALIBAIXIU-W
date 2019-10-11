var path = require("path");
var fs = require("fs");
var rootPath = __filename;
renameFilesInDir(path.dirname(rootPath));
/**
 * 修改文件名字
 * @param {文件路径} filepath 
 * @param {是否是文件夹} bool 
 */
function Rename(filepath,bool) {
    var filename = path.basename(filepath);
    var parentDir =path.dirname(filepath); 
    if(filename.includes('(1)')){
        var newPath=parentDir+"\\"+filename.replace('(1)','');
        fs.rename(filepath,newPath,function(err) {
            if(err) return;   //报错 就结束  
            if(bool){
            renameFilesInDir(newPath);
            }   
        }); 
    }else
    {
       if(bool){
        renameFilesInDir(filepath);
       }
    }
}

function changeFileName(filepath){
    fs.stat(filepath,function(err,stats){
        if(err) return;      //报错 就结束  
        if(stats.isFile()){  //是文件
            Rename(filepath,false);
        }else if(stats.isDirectory()){ //是文件夹
            Rename(filepath,true);
        }else{
        console.log("unknow type of file");
        }
    });
}

/**
 * 循环遍历文件夹
 * @param {文件夹} dir 
 */
function renameFilesInDir(dir){
    fs.readdir(dir,function(error,files){
        var len = files.length;
        var file = null;
        for(var i=0;i<len;i++){
            file = files[i];
            changeFileName(dir+"\\"+file);
        }
    });
}

