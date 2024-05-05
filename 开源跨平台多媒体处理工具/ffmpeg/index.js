/**
 * ffmpeg
 */

const{execSync} = require('child_process');
// - 1.基本格式转换
// execSync('ffmpeg -i test.mp4 test.gif',{stdio:'inherit'})// 转换成gif格式
// execSync('ffmpeg -i test.mp4 test.avi',{stdio:'inherit'})// 转换成avi格式
// - 2.提取视频中的音频
// execSync('ffmpeg -i test.mp4 test.mp3',{stdio:'inherit'})// 转换成avi格式
// - 3.裁剪视频
// execSync('ffmpeg -ss 00:00:00 -to 00:00:02 -i test.mp4 test1.mp4',{stdio:'inherit'})// 裁剪视频
// - 4.加水印
// execSync('ffmpeg -i test.mp4 -vf drawtext=text="SMZ":fontsize=40:x=10:y=10:fontcolor=white test2.mp4',{stdio:'inherit'})// 加水印
// - 5.删除水印
execSync('ffmpeg -i test2.mp4 -vf delogo=x=10:y=10:w=90:h=30 test3.mp4',{stdio:'inherit'})// 删除水印