import { h } from 'preact';
import {useMemo, useState} from 'preact/hooks';
import ToggleTabs from "./components/ToggleTabs";
import InputField from './components/InputField';
import CheckboxField from './components/CheckboxField';
import DownloadButton from './components/DownloadButton';
import styles from './Widget.module.css';
import { isNumber, getNumber } from "./utils";
import YearsSelector from "./components/YearsSelector";


const Widget = () => {
    const [values, setValues] = useState({
        years: "",
        mileage: "",
        gasCost: "",
        milesPerGallon: "",
        electricityCost: "",
    });
    const [chargeAtHome, setChargeAtHome] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("monthly");
    const [mileageActiveTab, setMileageActiveTab] = useState<string>("daily");
    const location: string = "Gotham City, NJ, 12345";
    const milesPerKWh = 3;

    // Extract values and convert them to numbers
    const years = getNumber(values.years);
    const mileage = getNumber(values.mileage);
    const gasCost = getNumber(values.gasCost);
    const milesPerGallon = getNumber(values.milesPerGallon);
    const electricityCost = getNumber(values.electricityCost);

    const annualMileage = mileageActiveTab === "daily" ? mileage * 365 : mileage;
    const homeChargeDiscount = 0.75;

    const gasCarCost = milesPerGallon
        ? (annualMileage / milesPerGallon) * gasCost * years
        : 0;

    const electricCarCost = milesPerKWh
        ? (annualMileage / milesPerKWh) * (chargeAtHome ? (electricityCost * homeChargeDiscount) : electricityCost) * years
        : 0;

    const totalSavings = (gasCarCost - electricCarCost).toFixed(2);
    const savingsData = useMemo(() => {
        if (!years) return "0.00";

        const savingsPerYear = (gasCarCost - electricCarCost) / years;

        switch (activeTab) {
            case "monthly":
                return `${(savingsPerYear / 12).toFixed(2)}/mo`;
            case "annual":
                return `${savingsPerYear.toFixed(2)}/an`;
            case "total":
                return totalSavings;
            default:
                return "0.00";
        }
    }, [activeTab, gasCarCost, electricCarCost, years, totalSavings]);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        let {name, value} = target;

        if (isNumber(value)) {
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: prev[name],
            }));
        }
    };

    const handleDownload = () => {
        const data = `
            EV vs Gas Savings Report
            ---------------------------------
            Location: ${location}
        
            - Daily Mileage: ${values.mileage} miles/day
            - Gas Cost: $${values.gasCost}/gallon
            - Gas Car Efficiency: ${values.milesPerGallon} miles/gallon
            - Electricity Cost: $${values.electricityCost}/kWh
            - Years of Ownership: ${values.years}
            - Charge at Home: ${chargeAtHome ? "Yes" : "No"}
        
            - Annual Mileage: ${annualMileage} miles/year
            - Gas Car Cost: $${gasCarCost.toFixed(2)}
            - Electric Car Cost: $${electricCarCost.toFixed(2)}
            - Selected Plan: ${activeTab} 
            - Savings: $${savingsData}
            - Total Savings: $${totalSavings}
        
            Report generated by  Lyteflo EV Savings Widget.
            `;

        const blob = new Blob([data], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "EV_vs_Gas_Savings_Report.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <section class={styles.widget}>
            <header>
                <h2 class={styles.title}>Ownership Savings</h2>
                <p className={styles.location}>
                    in
                    <a class={styles.locationLink}
                       href="https://en.wikipedia.org/wiki/Gotham_City"
                       target="_blank">{location}
                    </a>
                </p>
                <p className={styles.savingsAmount}>{`$${savingsData}`}</p>
                <p className={styles.subtext}>
                    {`Total ${Number(values.years) > 0 ? `${values.years}-year ` : ""}savings ($${totalSavings})`}
                </p>
            </header>
            <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={["monthly", "annual", "total"]}/>
            <div class={styles.trees}>Save 115 trees (5,500 lbs of CO2)</div>
            <YearsSelector
                value={Number(values.years) || 0}
                onChange={(newYears) => setValues((prev) => ({...prev, years: String(newYears)}))}
            />
            <form class={styles.widget__form}>
                <fieldset className={styles.fieldset}>
                    <legend class={styles.legend}>Ownership Details</legend>
                    <InputField label="Mileage"
                                id="mileage"
                                name="mileage"
                                value={values.mileage}
                                onInput={handleChange}>
                        <ToggleTabs activeTab={mileageActiveTab}
                                    setActiveTab={setMileageActiveTab}
                                    tabs={["daily", "annual"]}
                                    theme="light"/>
                    </InputField>
                    <div class={styles.alignChildren}>
                        <InputField label="Gas Cost / gallon"
                                    id="gasCost"
                                    name="gasCost"
                                    value={values.gasCost}
                                    onInput={handleChange}/>
                        <InputField label="Gas Car miles / gallon"
                                    id="milesPerGallon"
                                    name="milesPerGallon"
                                    value={values.milesPerGallon}
                                    onInput={handleChange}/>
                    </div>
                    <InputField label="Electricity Cost / kWh"
                                id="electricityCost"
                                name="electricityCost"
                                value={values.electricityCost}
                                onInput={handleChange}/>
                </fieldset>
                <CheckboxField label="Charge at home"
                               id="charge-at-home"
                               checked={chargeAtHome}
                               onChange={e => setChargeAtHome((e.target as HTMLInputElement).checked)}/>
            </form>
            <footer class={styles.footer}>
                <DownloadButton onClick={handleDownload}/>
            </footer>
        </section>
    );
};

export default Widget;

