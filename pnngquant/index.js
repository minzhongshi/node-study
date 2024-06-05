/**
 * pngquant 使用修改过的 Median Cut 量化算法以及其他技术来实现压缩 PNG 图像的目的。
 *
 * 调用 pngquant
 *
 *
 */

import { exec}  from 'child_process';
exec('pngquant 73kb.png --output test.png');


/**
 * quality表示图片质量0-100值越大图片越大效果越好
 */
exec('pngquant 73kb.png --quality=82 --output test2.png');


/**
 * --speed=1: 最慢的速度，产生最高质量的输出图像。
 *
 * --speed=10: 最快的速度，但可能导致输出图像质量稍微降低。
 */
exec('pngquant 73kb.png --speed=1 --quality=82 --output test3.png');
