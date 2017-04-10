package com.zhao.test.util;


import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
 
/**
 * 转换图片为 流式加载
 * @author zhaosx
 *
 */
public class ProgressiveJPEG {
 
    public static void main(String[] args) throws Exception {
        File file=new File("Z:/2.jpg"); 
        BufferedImage image = ImageIO.read(file); 
        Iterator<ImageWriter> it = ImageIO.getImageWritersByFormatName("jpeg"); 
        ImageWriter writer=null; 
        while(it.hasNext()) { 
             writer=it.next(); 
             break; 
             //System.out.println(it.next()); 
        } 
        if(writer!=null) { 
             ImageWriteParam params = writer.getDefaultWriteParam(); 
             params.setProgressiveMode(ImageWriteParam.MODE_DEFAULT); 
             //params.setCompressionQuality(0.8f); 
             ImageOutputStream output = ImageIO.createImageOutputStream(new File("Z:/22.jpg")); 
             writer.setOutput(output); 
             writer.write(null,new IIOImage(image,null,null), params); 
             output.flush(); 
             writer.dispose(); 
             System.out.println("ok"); 
        } 
 
    }
 
}