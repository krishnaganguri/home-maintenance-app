export default{ maintenanceRules : {
  refrigerator: [
    {
      task: "Clean condenser coils",
      frequencyDays: 180,
    },
    {
      task: "Replace water filter",
      frequencyDays: 180,
    },
  ],

  dishwasher: [
    {
      task: "Clean dishwasher filter",
      frequencyDays: 30,
    },
    {
      task: "Run cleaning cycle",
      frequencyDays: 60,
    },
  ],

  dryer: [
    {
      task: "Clean lint trap",
      frequencyDays: 30,
    },
    {
      task: "Inspect dryer vent",
      frequencyDays: 90,
    },
  ],

  washer: [
    {
      task: "Run drum cleaning cycle",
      frequencyDays: 60,
    },
  ],

  hvac: [
    {
      task: "Replace HVAC air filter",
      frequencyDays: 60,
    },
  ],
}};