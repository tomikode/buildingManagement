import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const EditContract = ({ onEdit, contract = null }) => {
    const [_id, set_Id] = useState("");
    const [tenant, setUser] = useState("");
    const [landlord, setLandlord] = useState("");
    const [unit, setUnit] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setPrice] = useState("");
    const [chargeRate, setRate] = useState("");
    const [contractLoaded, setContractLoaded] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!tenant || !landlord || !unit || !startDate || !endDate || !totalPrice || !chargeRate) {
            alert("Please fill out all forms");
            return;
        }

        onEdit({ _id, tenant, landlord, unit, startDate, endDate, totalPrice, chargeRate });

        set_Id("");
        setUser("");
        setLandlord("");
        setUnit("");
        setStartDate("");
        setEndDate("");
        setPrice("");
        setRate("");
    };

    const loadContract = (contract) => {
        set_Id(contract._id);
        setUser(contract.tenant);
        setLandlord(contract.landlord);
        setUnit(contract.unit);
        setStartDate(contract.startDate);
        setEndDate(contract.endDate);
        setPrice(contract.totalPrice);
        setRate(contract.chargeRate);

        setContractLoaded(true);
    };

    return (
        <form onSubmit={onSubmit}>
            {contract && !contractLoaded && loadContract(contract)}
            <table style={{ borderSpacing: "10px 15px" }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Tenant Name</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Tenant Name"
                                value={tenant}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Landlord Name</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Input Landlord Name"
                                value={landlord}
                                onChange={(e) => setLandlord(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Unit Number</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Input Unit Number"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </td>
                    </tr>


                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Start Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>End Date</label>
                        </td>
                        <td>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Rent Amount</label>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Input Rent Amount"
                                value={totalPrice}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Rent Cycle</label>

                        </td>
                        <td>
                            <input
                                type="radio"
                                id="weekly"
                                value="Weekly"
                                name="Cycle"
                                onChange={(e) => setRate(e.target.value)}
                            />
                            <label for="weekly">Weekly </label>
                            <input
                                type="radio"
                                id="monthly"
                                value="Monthly"
                                name="Cycle"
                                onChange={(e) => setRate(e.target.value)}
                            />
                            <label for="Monthly">Monthly </label>
                            <input
                                type="radio"
                                id="yearly"
                                value="Yearly"
                                name="Cycle"
                                onChange={(e) => setRate(e.target.value)}
                            />
                            <label for="yearly">Yearly</label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <input type="submit" value="SAVE CONTRACT" className={styles.rightButton} />
        </form>
    );
};

export default EditContract;