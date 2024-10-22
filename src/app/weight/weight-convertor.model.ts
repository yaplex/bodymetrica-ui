import { WeightLog } from "./weight-log/weight-log.model";

export class WeightConvertor {
    public static convertNumber(weight: number, weightUnits: string): number {

        if (weightUnits === "kg") {
            // already stored in KG, no conversion required
            return weight;
        }
        else if (weightUnits === "lb") {
            // convert LB to KG
            return this.convertToKg(weight);
        }

        return weight;
    }

    static convertToKg(weightInPounds: number): number{
        return weightInPounds / 2.20462;
    }

    static convertToPounds(weightInKg: number): number{
        return weightInKg * 2.20462;
    }

    public static convertWeightLogArray(weightLogs: WeightLog[], weightUnits: string): WeightLog[] {
        if (weightUnits === "kg") {
            // already stored in KG, no conversion required
            return weightLogs;
        }
        else if (weightUnits === "lb") {
            // convert KG to LB
            for (let i = 0; i < weightLogs.length; i++) {
                weightLogs[i].weight = this.convertToPounds(weightLogs[i].weight);
            }
            return weightLogs;
        }

        return weightLogs;
    }
}