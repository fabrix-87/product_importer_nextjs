import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Icon } from '@iconify/react';
import { Link } from "@nextui-org/link";

export interface ProductsCardProps {
	totalProducts: number;
    totalCombinations: number;
}

export const ProductsCard = ({ totalProducts, totalCombinations } : ProductsCardProps) => (
    <Card className="p-3">
        <CardHeader className="flex gap-3">
            <Icon icon="fluent-mdl2:product-variant" />
            <div className="flex flex-col">
                <p className="text-md">Prodotti</p>
            </div>
        </CardHeader>
        <CardBody>
            <p>Totale prodotti inseriti: <b>{totalProducts}</b></p>
            <p>Combinazioni totali: <b>{totalCombinations}</b></p>
        </CardBody>          
        <CardFooter>
            <Link isBlock showAnchorIcon href="/products" color="primary">
                Pi&ugrave; informazioni
            </Link>
        </CardFooter>
    </Card>
);

