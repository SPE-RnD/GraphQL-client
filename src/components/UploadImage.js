import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks"; //untuk mutation

const uploadGambarMutation = gql`
  mutation uploadGambar($file: Upload!) {
    uploadGambar(file: $file)
  }
`;

export const UploadImage = () => {

  const [uploadGambar] = useMutation(uploadGambarMutation); //Menjalankan mutation
  const onDrop = useCallback( //Function yang akan jalan saat terdapat file yang ingin di upload
    ([file]) => {
      uploadGambar({ variables: { file } });
    },
    [uploadGambar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop file</p>
      ) : (
        <p>Select File </p>
      )}
    </div>
  );
};