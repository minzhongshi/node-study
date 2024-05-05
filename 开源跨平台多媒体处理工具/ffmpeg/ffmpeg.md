## ffmpeg简介
>ffmpeg是一个非常强大的音视频处理工具，它包含了非常多的音视频处理的库和工具，包括了视频采集、视频格式转换、视频抓图、给视频加水印等等几乎所有视频处理的功能都可以实现。
> 

## ffmpeg 的主要功能和特征
- 格式转换：可以在各种音视频格式之间进行相互转换，包括音频、视频、字幕等等。可以用它来把一个音频转换成另一个音频格式，也可以把一个视频转换成另一个视频格式。
- 视频处理：可以对视频进行裁剪、旋转、缩放、加水印、提取图片、提取音频、调整帧率等等。可以用它来把一个视频裁剪成多个小视频，也可以把多个小视频合并成一个大视频。
- 音频处理：可以对音频进行裁剪、合并、转码、混音等等。可以用它提取视频中的音频，也可以把多个音频合并成一个音频。
- 画面抓取：可以从视频中抓取连续的图片，也可以从视频中抓取指定时间的图片。
- 视频解析：可以解析出视频中的音频流和视频流，也可以解析出视频中的字幕流。
- 视频采集：可以采集摄像头的视频，也可以采集麦克风的音频。
- 视频推流：可以把视频推送到流媒体服务器，也可以把视频推送到自己搭建的流媒体服务器。用于搭建自己的直播平台、在线会议。
- 跨平台：ffmpeg可以在Linux、Windows、Mac上运行，也可以在Android、iOS上运行。支持硬件加速，可以利用GPU进行加速。

## ffmpeg 的安装
### Linux
- 1.下载源码
```shell
wget http://ffmpeg.org/releases/ffmpeg-6.0.tar.bz2
```
- 2.解压
```shell
tar -jxvf ffmpeg-6.0.tar.bz2
```
- 3.安装依赖
```shell
yum install -y autoconf automake cmake freetype-devel gcc gcc-c++ git libtool make mercurial nasm pkgconfig zlib-devel
```
- 4.编译安装
```shell
cd ffmpeg-6.0
./configure --enable-shared --prefix=/usr/local/ffmpeg
make
make install
```
- 5.配置环境变量
```shell
vim /etc/profile
```
- 6.在文件末尾添加
```shell
export PATH=$PATH:/usr/local/ffmpeg/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/ffmpeg/lib
```
- 7.使环境变量生效
```shell
source /etc/profile
```
- 8.查看版本
```shell
ffmpeg -version
```
### Windows
- 1.下载ffmpeg
```shell
https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip
```
- 2.解压
- 3.配置环境变量
```shell
E:\ffmpeg\ffmpeg-6.0-essentials_build\bin
```
- 4.查看版本
```shell
ffmpeg -version
```
## ffmpeg 的使用
### 基本使用
- 1.查看帮助
```shell
ffmpeg -h
```
- 2.查看支持的格式
```shell
ffmpeg -formats
```
- 3.查看支持的编解码器
```shell
ffmpeg -codecs
```
- 4.查看支持的滤镜
```shell
ffmpeg -filters
```
- 5.查看支持的协议
```shell
ffmpeg -protocols
```
- 6.查看支持的像素格式
```shell
ffmpeg -pix_fmts
```
- 7.查看支持的标准
```shell
ffmpeg -standards
```
- 8.查看支持的设备
```shell
ffmpeg -devices
```
- 9.查看支持的配置选项
```shell
ffmpeg -bsfs
```
- 10.查看支持的组件
```shell
ffmpeg -components
```
### 小功能(demo.js)
- 1.基本格式转换
- 2.提取视频中的音频
- 3.裁剪视频
- 4.加水印
- 5.删除水印
