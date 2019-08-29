package com.zsx;

import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexReaderContext;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Demo {


    public static void main(String[] args) {


        Path path = null;
        IndexWriterConfig config = null;
        IndexWriter indexWriter = null;
        try {
            path = Paths.get("../test");
            FSDirectory directory = FSDirectory.open(path);
            config = new IndexWriterConfig();

            indexWriter = new IndexWriter(directory, config);


        } catch (IOException e) {
            e.printStackTrace();
        }


//        new IndexWriter("", null);


//        IndexReader indexReader = new IndexReader("");

//        IndexReaderContext context = new IndexReader().getContext();
    }

}
