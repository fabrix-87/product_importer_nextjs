import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Icon } from '@iconify/react';
import { Link } from "@nextui-org/link";

export interface SuppliersCardProps {
	totalSuppliers: number;
}

export const SuppliersCard = ({ totalSuppliers } : SuppliersCardProps) => (
    <Card className="p-3">
        <CardHeader className="flex gap-3">
            <Icon icon="mdi:company" />
            <div className="flex flex-col">
                <p className="text-md">Fornitori</p>
            </div>
        </CardHeader>
        <CardBody>
            <p>Fornitori attualmente registrati: <b>{totalSuppliers}</b></p>
        </CardBody>          
        <CardFooter>
            <Link isBlock showAnchorIcon href="/suppliers" color="primary">
                Pi&ugrave; informazioni
            </Link>
        </CardFooter>
    </Card>
);

