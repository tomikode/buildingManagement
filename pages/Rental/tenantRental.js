import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/UserManagment.module.css";
import Link from "next/link";

const tenantRental = () => {
    return (
        <Layout pageType="all">
            <div className={styles.centreWrapper}>
                <div className={styles.contentBox}>
                    <div className={styles.title}>
                        <h1>Rent Payment</h1>
                        <br />
                        <form>
                            <table style={{ borderSpacing: "10px 15px" }}>
                                <tbody>
                                <tr>
                                        <td style={{ textAlign: "left" }}>
                                            <label>Manager</label>
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <label>John Doe</label>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "left" }}>
                                            <label>Rent Due</label>
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <label>XX/XX/20XX</label>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "left" }}>
                                            <label>Rent Amount</label>
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <label>$250</label>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "left" }}>
                                            <label>Payment Method</label>
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            Card XXXX
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default tenantRental;