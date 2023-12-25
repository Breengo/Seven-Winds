import { Omit } from "../../node_modules/@reduxjs/toolkit/dist/tsHelpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RowData } from "../types";

const EID = 114136;

type RowCreationData = Omit<RowData, "child">;
type CreationResponseData = {
  current: RowData;
  changed: [];
};

export const dataApi = createApi({
  reducerPath: "dataApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/${EID}/row`,
  }),

  endpoints: (builder) => ({
    getData: builder.query<RowData[], void>({
      query: () => `/list`,
    }),

    createRow: builder.mutation<CreationResponseData, RowCreationData>({
      query: (payload) => ({
        url: `/create`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        dispatch(
          dataApi.util.updateQueryData("getData", undefined, (draft) => {
            if (!payload.parentId)
              draft.push({ ...data.data.current, child: [] });
            function findParent(node: RowData) {
              if (node.id === payload.parentId)
                return node.child.push({ ...data.data.current, child: [] });

              node.child.forEach((child) => findParent(child));
            }
            draft.forEach((node) => findParent(node));
          })
        );
      },
    }),

    deleteRow: builder.mutation({
      query: (rowID) => ({
        url: `${rowID}/delete`,
        method: "DELETE",
      }),
      async onQueryStarted(rowID, { dispatch }) {
        dispatch(
          dataApi.util.updateQueryData("getData", undefined, (draft) => {
            function findNode(node: RowData | null, parent: RowData | null) {
              if (!node) return;
              if (node.id === rowID) {
                if (!parent) {
                  const index = draft.findIndex((child) => child.id === rowID);
                  return draft.splice(index, 1);
                }
                const index = parent.child.findIndex(
                  (child) => child.id === rowID
                );
                return parent.child.splice(index, 1);
              }
              node.child.forEach((child) => findNode(child, node));
            }
            draft.forEach((node) => findNode(node, null));
          })
        );
      },
    }),

    updateRow: builder.mutation<CreationResponseData, RowData>({
      query: (payload) => ({
        url: `${payload.id}/update`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        dispatch(
          dataApi.util.updateQueryData("getData", undefined, (draft) => {
            function findNode(node: RowData | null) {
              if (!node) return;
              const newData = data.data.current;

              if (node.id === payload.id) {
                node.rowName = newData.rowName;
                node.equipmentCosts = newData.equipmentCosts;
                node.estimatedProfit = newData.estimatedProfit;
                node.overheads = newData.overheads;
                node.salary = newData.salary;
              }

              node.child.forEach((child) => findNode(child));
            }
            draft.forEach((node) => findNode(node));
          })
        );
      },
    }),
  }),
});

export const {
  useGetDataQuery,
  useCreateRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} = dataApi;
