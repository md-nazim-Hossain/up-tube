"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { format } from "date-fns";
import { viewsFormat } from "@/utils/video";
import { Typography } from "@/components/ui/typography";
import { PostTableRowActions } from "./post-table-row-actions";
import PostFormModal from "@/components/modals/post-form-modal";

export const PostTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "content",
    header: ({ table, column }) => (
      <DataTableColumnHeader column={column} title="Post" />
    ),
    cell: ({ row }) => {
      return (
        <PostFormModal
          isEdit
          defaultValue={{
            content: row?.getValue("content"),
            _id: row?.original?._id,
          }}
          triggerClassName="max-w-[500px] text-left line-clamp-2"
          trigger={
            <Typography variant={"small"} className="text-sm">
              {row?.getValue("content")}
            </Typography>
          }
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader isShown column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {format(new Date(row.getValue("createdAt")), "dd MMM yyyy")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("comments"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {viewsFormat(row.getValue("likes"))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <PostTableRowActions row={row} />
      </div>
    ),
  },
];
