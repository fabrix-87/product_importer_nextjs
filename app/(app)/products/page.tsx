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
import { useProducts } from "@/hooks/products";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import { Product } from "@/types";
import Loading from "@/components/Loading";
import { title } from "@/components/primitives";

const statusColorMap: Record<string, ChipProps["color"]> = {
	1: "success",
	0: "danger",
}

const INITIAL_VISIBLE_COLUMNS = ["id", "reference", "name", "status", "supplier", "actions"];

export default function ProductsPage() {
	const [filterValue, setFilterValue] = useState("");
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { products, isLoading, totalPages, totalProducts, toggleStatus, setRefresh } = useProducts({
		search: filterValue,
		page,
		limit: rowsPerPage
	})

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

	const onToggleProduct = (id: number, currentStatus: number) => {
		toggleStatus(id, currentStatus)
		setRefresh(true)
	}
	/*

	const filteredItems = useMemo(() => {
		let filteredProducts = [...products];

		if (hasSearchFilter) {
			filteredProducts = filteredProducts.filter((product) =>
				product.reference.toLowerCase().includes(filterValue.toLowerCase()) || product.languages[0].pivot.name.toLowerCase().includes(filterValue.toLowerCase()),
			);
		}
		if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
			filteredProducts = filteredProducts.filter((product) =>
				Array.from(statusFilter).includes(product.active),
			);
		}
		return filteredProducts;
	}, [products, filterValue, statusFilter]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);


	const sortedItems = useMemo(() => {
		return [...items].sort((a: Product, b: Product) => {
			const first = a[sortDescriptor.column as keyof Product] as number;
			const second = b[sortDescriptor.column as keyof Product] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	*/

	const renderCell = useCallback((product: Product, columnKey: React.Key) => {
		//const cellValue = product[columnKey as keyof Product];
		switch (columnKey) {
			case "id":
				return (
					<div>
						{product.id}
					</div>
				);
			case "reference":
				return (
					<div>
						{product.reference}
					</div>
				);
			case "name":
				return (
					<div className="flex flex-col">
						{product.languages[0].pivot.name}
					</div>
				);
			case "status":
				return (
					<Chip className="capitalize" color={statusColorMap[product.active]} size="sm" variant="flat">
						{product.active == 1 ? 'Attivo' : 'Disattivato'}
					</Chip>
				);
			case "supplier":
				return (
					<div className="flex flex-col">
						{product.supplier.name}
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
								<DropdownItem aria-label="Disabilita" onClick={() => onToggleProduct(product.id, product.active)}>
									{ product.active == 1 ? 'Disabilita' : 'Abilita' }
								</DropdownItem>
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
				<h1 className={title()}>Prodotti</h1>
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
					items={products}
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
