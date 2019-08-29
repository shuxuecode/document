package com.zsx;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.FieldType;
import org.apache.lucene.index.*;
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


            Document document = new Document();
            FieldType fieldType = new FieldType();
            fieldType.setStored(true);

            document.add(new Field("name", "zsx", fieldType));

            indexWriter.addDocument(document);

            indexWriter.commit();
            directory.close();

        } catch (IOException e) {
            e.printStackTrace();
        }


//        new IndexWriter("", null);


//        IndexReader indexReader = new IndexReader("");

//        IndexReaderContext context = new IndexReader().getContext();
    }

}
