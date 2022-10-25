import React from "react";
import styles from "../../styles/Rental.module.css";

const ViewContract = ({
    contract,
    user,
    closeView,
    updateContract,
}) => {
    const submitContract = (e) => {
        e.preventDefault();
        const updated = {
            user: contract.tenant,
            landlord: contract.landlord,
            unti: contract.unit,
            startDate: contract.startDate,
            endDate: contract.endDate,
            price: contract.totalPrice,
            rate: contract.chargeRate,
        };
        updateContract(updated);
    };

    return (
        <div className={styles.createWrapper}>
            <div className={styles.createBox}>
                <h1>Create Contract</h1>
                <form onSubmit={submitContract}>
                    <table style={{ borderSpacing: "10px 15px" }}>
                    <tbody>
                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Tenant Name</label>
                        </td>
                        <td>
                            <input defaultValue={contract.tenant} required name="tenant"
                                type="text"
                                placeholder="Input Tenant Name"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Landlord Name</label>
                        </td>
                        <td>
                            <input defaultValue={contract.landlord} required name="landlord"
                                type="text"
                                placeholder="Input Landlord Name"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }}>
                            <label>Unit Number</label>
                        </td>
                        <td>
                            <input defaultValue={contract.unit} required name="unit"
                                type="number"
                                placeholder="Input Unit Number"
                            />
                        </td>
                    </tr>


                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Start Date</label>
                        </td>
                        <td>
                            <input defaultValue={contract.startDate} required name="startdate"
                                type="date"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>End Date</label>
                        </td>
                        <td>
                            <input defaultValue={contract.endDate} required name="enddate"
                                type="date"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <label>Rent Amount</label>
                        </td>
                        <td>
                            <input defaultValue={contract.price} required name="rent"
                                type="number"
                                placeholder="Input Rent Amount"
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
                            />
                            <label for="weekly">Weekly </label>
                            <input
                                type="radio"
                                id="monthly"
                                value="Monthly"
                                name="Cycle"
                            />
                            <label for="Monthly">Monthly </label>
                            <input
                                type="radio"
                                id="yearly"
                                value="Yearly"
                                name="Cycle"
                            />
                            <label for="yearly">Yearly</label>
                        </td>
                    </tr>
                </tbody>
            </table>
                    <br />
                    <input type="submit" value="UPDATE CONTRACT" className={styles.rightButton} />
                </form>
            </div>
        </div>
    )
};

export default ViewContract;