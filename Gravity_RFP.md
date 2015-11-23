# Gravity Project Brief (RFP)

## Project Summary

Develop an Open Source Solution to manage the inventory tracking requirements within a warehouse environment. Future iterations will be developed upon this foundation.



## Key Due Dates

All items below are due at the beginning of lecture unless otherwise specified.

* Daily Deployments (Days 2-9, End of Lab)
* Day 1: Organization into Teams (Beginning of Lab)
* Day 2: RFP Response / Kick-Off
* Day 2: Deployment Pipeline setup (End of Lab)
* Day 4: API Modification Requests / Work with External Front End Team (End of Lab)
* Day 5: Product Owner Update
* Day 8: Product Owner Update
* Day 9: Final Deployment
* Day 10: Presentation to Product Owner



## Project Background

Your team has been contracted to design an Inventory Management System. There are several processes (outlined below) that explain the order actions to facilitate the prompt reception, fulfillment, supporting processes, and shipping of orders.

**Bold Items** refer to objects that need manipulated while *Italic Item* are more representative of Actions or Statuses of objects and processes.

### The Order Fulfillment Process

This process identifies each step that is taken in reaction to an Order's reception that combinate in the Picking and Shipping of each Unit in the Order.

1. An **Order** is received for *Fulfillment*.
1. A **Bot** is *Dispatched* to procure a **Pod**.
1. The **Pod** is *Brought* to a **Pick Queue** of Pods.
1. When the **Pod** is at the top of the **Pick Queue**  a **Worker** is directed to remove a **Unit** from the pod in a process called *Picking*.
1. The **Worker** combines the *Picked* **Unit** with other *picked* **Units** as directed by the **Order** to create a **Package**.
1. The **Worker** *Finalizes* the **Packages** ready for QA.
1. **Packages** are *Collected* by another **Worker** to preform *QA*.
1. If *QA Fails* the **Package** and finds an inconsistency it is assigned to a **Problem Solver** for resolution.
1. If the **Package** *Passes QA* or has a been *Problem Solved* another **Worker** *Collects* the package.
1. Once collected they are *Registered* with a Shipping Vendor (UPS, FedEx, USPS) which will generate a **External Tracking Number** and *Loaded* onto a Truck.
1. When the **Truck** is *Filled* to capacity (Weight and/or Volume must be accounted for) the **Order** can be marked as *Shipped*.

### The Replenishment Process

This process ensures that enough units are available to fulfill the incoming orders.

1. When a **Worker** preforms a *Pick* of a **Unit** if the  **Total Units on Hand** of that unit is below the **Min Units Threshold** (see *Frequency Table*) a *replenishment* of that unit is *Triggered*.
1. Each **Unit** has its own **Replen Units Threshold** and an **Replenishment Order** is made for the difference between **Total Units on Hand** and its **Replen Units Threshold**.
1. The **Replenishment Order** will be added to the next **Replenishment Shipment**.
1. When a **Replenishment Shipment** *Arrives* **Workers** must preform *Quality Assurance (QA)* on each **Unit**
1. **Units** not passing *QA* are resolved by a **Problem Solver**.
1. **Units** That pass QA, or have successfully been *Problem Solved* are then loaded onto a **Pod** for storage and are available to be *Picked* for **Orders**.

#### Replenishment Scope

> Creating an algorithm to handle that ordering of low stock units is beyond the scope of this project. Alternatively we will address this as a simple threshold reorder.

### The Order Process

An external system will make an API POST request to an endpoint you must setup at **/order/new**. The POST request will receive a JSON object detailing the unit(s) within the order that need to be Picked, Packed, and Shipped to a provided address.

You will need to store this order information.

### The Maintenance Process

**Pods** need occasional servicing. Each time a **Worker** interacts with a Pod there is a chance the worker may notice it needs serviced and *Tag* the Pod as needing **Critical Service**  or **Unscheduled Service**. Additionally, each **Pod** requires a *Scheduled Service*.

##### Critical Service

> The Pod must **immediately** be assigned to a Worker for Maintenance, disrupting the current workflow.

##### Unscheduled Service

> The Pod must be assigned to a Worker for Maintenance before being picked again but can complete its current cycle.

##### Scheduled Service

> Inspection to be preformed by a **Worker**. See **Frequency Table**.



## Expectations



## Requirements



### General

* Team communication should be handled through Slack
* Project Management should be handled through the Github Issues System
* Simulate the time needed for a worker to preform a task while interacting with a unit/package/order. Actions, such as a **Worker** *Picking* a **Unit** from a **Pod**, should not happen instantaneously. These and other times are documented on the *Frequency Table*, any times not documented should be considered assumptions.

### API
* Create and Document an API including all Endpoints and Expected Usage
* Endpoints allowing for checking the current status of any  order, Worker's current task or any unit in inventory.
* Endpoints returning the total number of units at each status you elect to identify in the system (Example: Total Unique Units: 300,000, Pods Queued for Picking: 35, Pods Requiring Maintenance: 12, Bots Currently Queued for Picking: 150, etc...)

### Documentation

Document all relevant Project Information including:

* All assumptions in your readme.md and formally submit each to the Product Owner.
* The Installation Process
* Setting up the required Development Environment (For On-Boarding a new Developer)
* All API Endpoints and Expected Usage
* Each Endpoint should have (minimally) One Unit Test
* For visual reference, document and diagram the flow of orders, units, workers, bots within your system. This reference should  be modified to reflect any changes to the system through the development process.

### Production Process

##### Project Manager

* A deployment every class day is required. These should exist as pull requests made from *Development* to a *Release* branch.
* The PM can choose to review each pull request or delegate part or all of this duty, however the PM is responsible that all code merged into the *Development* Branch adheres to the **Development Guidelines**

##### Developers

* A deployment every class day is required. These should exist as pull requests made from the Dev's *Feature Branch* to a *Development* branch.

#### Development Guidelines

The Project will adhere to the Development Standards listed below. If you have any questions beyond the Development Guidelines that fall beyond the scope itemized below please consult the Product Owner.

* Passwords or API Keys should be saved to a [.env file](https://www.npmjs.com/package/dotenv) and NOT committed to your repo.
* Development Follow the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) (Covered Day 2)
* [Development Guide: Javascript](https://github.com/airbnb/javascript) (Covered Day 1)
* [Development Guide: React/JSX](https://github.com/airbnb/javascript/tree/master/react) (Covered Day 1)
* [12-Factor Methodology](http://12factor.net/) (Covered Day 3)
* [Semantic Versioning: SemVer](http://semver.org/) (Covered Day 4)

### Features

### Technology Choices



## Frequency Table

| Type | Frequency |
|---|---|
| **Problem Solver** takes a range of time to resolve | 2 - 8 hrs |
| **Unit** is Incorrectly **Replenishmented** | 0.70% |
| **Worker** *Picks* Incorrect **Unit** from **Pod** | 1.40% |
| **Bot** *Procures* Wrong **Pod**| 0.01% |
| **Pod** needs *Critical Service*| 0.05% |
| **Pod** needs *Unscheduled Service*| 0.80% |
| **Replenishment Shipment** *Arrives* | Every 5 mins |
| **Worker** *Picking* a **Unit** from a **Pod** |15 - 45 sec|
| **Worker** *Finalizing* a **Package** |1-2 mins|
| **Bot** *Procuring* a **Pod** takes | 10 mins|
| *Scheduled Service* for a **Pod** | Every 10,000 Picks |



## Request for Proposal Guidelines



## Supporting Statistic

|  Statistics |  |
| --- | --- |
| SKUs in a Warehouse (Amazon)| ^3 Million |
| Total Units in a Warehouse (Amazon) | ^21 Million |
| Total Units in a Warehouse (Kiva)| 10's of Thousands |
| Total Pods in a Warehouse (Amazon 2014) | [10,000](http://observer.com/2014/05/amazon-to-add-9000-robots-to-workforce-ending-great-robot-depression/) |
| Total Pods in a Warehouse (Kiva) | 1,000 |
| Total Bots in a Warehouse (Kiva) | 100 |
| Total Workers in a Warehouse (Kiva) | 300 |
| Total Orders Per Day (Quiet Logistics) | 30,000 day |
| Non-Robot Assisted Order Processing Time | 1 - 1.5 hrs |
| Robot Assisted Order Processing Time | 15 mins|
| Kiva Bots Recharge Time | 5 mins |
| Kiva Bots Accuracy | 99.99% |

[Sources](https://www.youtube.com/watch?v=zknLfU7GJIw&index=1&list=PLKeRbeoYMGFvgMrZzUDEXGkTbeMMxLR0U)
