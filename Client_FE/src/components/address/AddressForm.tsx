import { Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import DropdownAddress from "../dropdown/DropdownAddress";
import { set } from "react-hook-form";
import {
    Province,
    District,
    Ward,
    getProvinces,
    getDistricts,
    getWards,
} from "vietnam-provinces";
interface AddressFormProps {
    control: any;
    setValue: any;
    provinces: Province[];
    districts: District[];
    wards: Ward[];
    handleCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDistrictChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AddressForm = ({
    control,
    setValue,
    provinces,
    districts,
    wards,
    handleCityChange,
    handleDistrictChange,
}: AddressFormProps) => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-10">
                <div className="flex flex-col text-left">
                    <Label htmlFor="" className="px-2 text-lg">
                        City
                    </Label>
                    <DropdownAddress
                        className=""
                        control={control}
                        setValue={setValue}
                        dropdownLabel="Select City"
                        name="city"
                        list={provinces}
                        onChange={handleCityChange}
                    />
                </div>
                <div className="flex flex-col text-left">
                    <Label htmlFor="" className="px-2 text-lg">
                        District
                    </Label>
                    <DropdownAddress
                        onChange={handleDistrictChange}
                        className=""
                        control={control}
                        setValue={setValue}
                        dropdownLabel="Select district"
                        name="district"
                        list={districts}
                    />
                </div>
                <div className="flex flex-col text-left">
                    <Label htmlFor="" className="px-2 text-lg">
                        Ward
                    </Label>
                    <DropdownAddress
                        onChange={handleCityChange}
                        className=""
                        control={control}
                        setValue={setValue}
                        dropdownLabel="Select ward"
                        name="ward"
                        list={wards}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
