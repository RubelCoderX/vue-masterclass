import type { ColumnDef } from "@tanstack/vue-table"
import type { Projects } from "../supaQueries"
import { RouterLink } from "vue-router"

export const columns: ColumnDef<Projects[0]>[] = [
    {
      accessorKey: 'id',
      header: () => h('div', { class: 'text-left' }, 'Project ID'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('id'))
      },
    },
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) => {
        return h(
          RouterLink,
          { to: `/projects/${row.original.slug}`, class: 'text-left font-medium hover:bg-muted' },
          () => row.getValue('name'),
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
      },
    },
    {
      accessorKey: 'slug',
      header: () => h('div', { class: 'text-left' }, 'Slug'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('slug'))
      },
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-left font-medium' },
          JSON.stringify(row.getValue('collaborators')),
        )
      },
    },
  ]