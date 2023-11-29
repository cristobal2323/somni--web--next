import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

//types
import { IUploadArchive, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: IUploadArchive;
};

type ParametersUploadArchive = {
  data: FormData;
};

export const uploadArchiveApi = createApi({
  reducerPath: "uploadArchiveApi",
  baseQuery: baseQuery,
  tagTypes: ["UploadArchive"],
  endpoints: (builder) => ({
    postUploadArchive: builder.mutation<Data, ParametersUploadArchive>({
      query: ({ data }) => {
        const formData = new FormData();
        const file = data.get("file");
        const empresa_id = data.get("empresa_id");

        if (file && empresa_id) {
          formData.append("file", file);
          formData.append("empresa_id", empresa_id);
        } 

        return {
          url: `upload`,
          body: formData,
          method: "POST",
        };
      },
      invalidatesTags: ["UploadArchive"],
    }),
  }),
});

export const { usePostUploadArchiveMutation } = uploadArchiveApi;
