'use client'
import { title } from "@/components/primitives";

import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";

import { Icon } from '@iconify/react';
import { columns, productColumnsType, statusOptions } from "./data";
import { Input } from "@nextui-org/input";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { productFilters, useProducts } from "@/hooks/products";
import { Chip } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";

const statusColorMap = {
	active: "success",
	disabled: "danger",
}

enum productsStatus {
	any,
	active = 1,
	inactive = 0,
}

const INITIAL_VISIBLE_COLUMNS = ["reference", "name", "status", "supplier"];

export default function ProductsPage() {
	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const { getProducts } = useProducts()
	const [products, setProducts] = useState<any>([])

	const [filterValue, setFilterValue] = useState<productFilters[]>([]);
	const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
	const [visibleColumns, setVisibleColumns] = useState(
		new Set<string>(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = useState<productsStatus>(productsStatus.any);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [sortDescriptor, setSortDescriptor] = useState({
		column: "id",
		direction: "ascending",
	});
	const [page, setPage] = useState(1);

	const hasSearchFilter = Boolean(searchValue);

	useEffect(() => {
		const fetchProducts = async () => {
			await getProducts().then( (res) => {
				setProducts(res.data['data'])
				setIsLoading(false)
			})
		}
		fetchProducts()

		return () => {}
	},[])

	const headerColumns = useMemo(() => {
		return columns.filter((column: productColumnsType) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredProducts = [...products];

		if (hasSearchFilter) {
			filteredProducts = filteredProducts.filter((product) => {
				console.log(product.languages)
				if(product.languages)
					product.languages.pivot.name.toLowerCase().includes(searchValue.toLowerCase())
			});
		}
		if (statusFilter !== productsStatus.any) {
			console.log(statusFilter)
			filteredProducts = filteredProducts.filter((user) =>
				user.active = statusFilter
			);
		}

		return filteredProducts;
	}, [products, hasSearchFilter, statusFilter, searchValue]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);


	const renderCell = useCallback((product: any, columnKey: any) => {
		let cellValue = '';

		if(columnKey == 'name' &&  product.languages){
			console.log(product)
			cellValue = product.languages[0].pivot.name
		}
		else
			cellValue = product[columnKey];

		switch (columnKey) {
			case "reference":
			case "name":
				return (
					<div className="flex flex-col">
						{cellValue}
					</div>				
				);
			case "status":
				return (
					<Chip className="capitalize" color={
						product.active == 1 ? 'success' : 'danger'
					} size="sm" variant="flat">
						{cellValue}
					</Chip>
				);			
			default:
				return cellValue;
		}
	}, []);

	const onNextPage = useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

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
			setSearchValue(value);
			//setPage(1);
		} else {
			setSearchValue('');
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue([]);
		setPage(1);
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<Icon icon="mdi:search" />}
						value={searchValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Button color="primary" endContent={<Icon icon="mdi:plus" />}>
							Add New
						</Button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Ci sono {products.length} prodotti
					</span>
					<label className="flex items-center text-default-400 text-small">
						Elementi per pagina:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [searchValue, onSearchChange, products.length, onRowsPerPageChange, onClear]);

	const bottomContent = useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Previous
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		);
	}, [page, pages, onPreviousPage, onNextPage]);

	return (
		<>
			<div>
				<h1 className={title()}>Prodotti</h1>
			</div>
			<Table
				aria-label="Tabella prodotti su importer"
				isHeaderSticky
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				classNames={{
					wrapper: "max-h-[382px]",
				}}
				selectedKeys={selectedKeys}
				selectionMode="multiple"

				topContent={topContent}
				topContentPlacement="outside"

			>
				<TableHeader columns={headerColumns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
							allowsSorting={column.sortable}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"No users found"} items={sortedItems}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
