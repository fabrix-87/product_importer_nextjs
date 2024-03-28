'use client'

import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Icon } from '@iconify/react';
import { columns, statusOptions } from "./data";
import { Input } from "@nextui-org/input";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { Category } from "@/types";
import Loading from "@/components/Loading";
import { title } from "@/components/primitives";
import { useCategories } from "@/hooks/categories";
import { usePrestaCategories } from "@/hooks/prestaCategories";

const statusColorMap: Record<string, ChipProps["color"]> = {
	1: "success",
	0: "danger",
}

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "supplier", "parent", "prestaCategories"];

export default function CategoryPage() {
	const [filterValue, setFilterValue] = useState("");
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { categories, isLoading, totalPages, totalProducts } = useCategories({
		search: filterValue,
		page,
		limit: rowsPerPage
	})

	const { prestaCategories, isLoading: isPrestaLoading, error: prestaError } = usePrestaCategories()

	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
	const [statusFilter, setStatusFilter] = useState<Selection>("all");
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: "id",
		direction: "ascending",
	});

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const renderCell = useCallback((category: Category, columnKey: React.Key) => {
		const cellValue = category[columnKey as keyof Category];
		switch (columnKey) {
			case "id":
				return (
					<div>
						{category.id}
					</div>
				);
			case "name":
				return (
					<div className="flex flex-col">
						{category.name}
					</div>
				);
			case "supplier":
				return (
					<div className="flex flex-col">
						{category.supplier.name}
					</div>
				);
			case "parent":
				return (
					<div className="flex flex-col">
						{category.parent?.name}
					</div>
				);
			case "actions":
				return (
					<div className="relative flex justify-end items-center gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button aria-label="Azioni" isIconOnly size="sm" variant="light">
									<Icon icon="mdi:dots-vertical" aria-label="Azioni" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem aria-label="Dettagli">Dettagli</DropdownItem>
								<DropdownItem aria-label="Modifica">Modifica</DropdownItem>
								<DropdownItem aria-label="Elimina">Elimina</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);

		}
	}, []);

	const onNextPage = useCallback(() => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	}, [page, totalPages]);

	const onPreviousPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Cerca per nome o codice..."
						startContent={<Icon icon="mdi:search" />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<Icon icon="mdi:chevron-down" className="text-small" />} variant="flat">
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode="multiple"
								onSelectionChange={setStatusFilter}
							>
								{statusOptions.map((status) => (
									<DropdownItem key={status.uid} className="capitalize">
										{status.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<Icon icon="mdi:chevron-down" className="text-small" />} variant="flat">
									Colonne
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{column.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button disabled color="primary" endContent={<Icon icon="mdi:plus" />}>
							Crea nuovo
						</Button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Ci sono {totalProducts} prodotti
					</span>
					<label className="flex items-center text-default-400 text-small">
						Elementi per pagina:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, totalProducts, onRowsPerPageChange, onClear]);

	const bottomContent = useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={totalPages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={totalPages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Precedente
					</Button>
					<Button
						isDisabled={totalPages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}
					>
						Successivo
					</Button>
				</div>
			</div>
		);
	}, [page, totalPages, onPreviousPage, onNextPage]);

	return (
		<>
			<div className="p-4">
				<h1 className={title()}>Categorie Fornitori</h1>
			</div>
			<Table
				aria-label="Example table with custom cells, pagination and sorting"
				isHeaderSticky
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				classNames={{
					wrapper: "min-h-[300px]",
				}}
				isStriped
				sortDescriptor={sortDescriptor}
				topContent={topContent}
				topContentPlacement="outside"
				onSelectionChange={setSelectedKeys}
				onSortChange={setSortDescriptor}
			>
				<TableHeader columns={headerColumns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={"center"}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					isLoading={isLoading}
					loadingContent={<Loading />}
					emptyContent={"Nessun prodotto trovato"}
					items={categories}
				>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
