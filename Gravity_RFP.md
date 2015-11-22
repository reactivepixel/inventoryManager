# Gravity

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
1. **Packages** are *Collected* by another **Worker**.
1. Once collected they are *Registered* with a Shipping Vendor (UPS, FedEx, USPS) which will generate a **External Tracking Number** and *Loaded* onto a Truck.
1. When the **Truck** is *Filled* to capacity (Weight and/or Volume must be accounted for) the **Order** can be marked as *Shipped*.

### The Replenishment Process

This process ensures that enough units are available to fulfill the incoming orders.

    Caveat: Creating an algorithm to handle that ordering of low stock units is beyond the scope of this project. Alternatively we will address this as a simple threshold reorder.



### The Order Process

An external system will make an API POST request to an endpoint you must setup at **/order/new**. The POST request will receive a JSON object detailing the unit(s) within the order that need to be Picked, Packed, and Shipped to a provided address.

You will need to store this order information.

### The Maintenance Process

From time to time **Pods** need serviced. Each time a **Worker** interacts with a Pod there is a chance the worker may notice it needs serviced and *Tag* the Pod as needing *Critical Service* or *Unscheduled Service*. Additionally, each **Pod** requires a *Scheduled Service* inspection to be preformed by a worker. See **Frequency Table** for the frequency.

## Expectations



## Requirements



#### General

* Team communication should be handled through Slack
* Project Management should be handled through the Github Issues System
* Document all assumptions and formally submit each to the Product Owner.
* For visual reference document and diagram the flow of orders, units, workers, bots within your system. This reference should  be modified to reflect any changes to the system through the development process.
* Simulate the time needed for a worker to preform a task while interacting with a unit/package/order. Actions such as a **Worker** *picking* a **Unit** from a **Pod** should not happen instantaneously. The time you allot to each task should be documented with your assumptions.

#### API
* Create and Document an API including all Endpoints and Expected Usage
* Endpoints allowing for checking the current status of any  order, Worker's current task or any unit in inventory.
* Endpoints returning the total number of units at each status you elect to identify in the system (Example: Total Unique Units: 300,000, Pods Queued for Picking: 35, Pods Requiring Maintenance: 12, Bots Currently Queued for Picking: 150, etc...)

#### Production Process
* A deployment every class day is required. These should exist as pull requests (by Each team member) made to a *Development* branch.
* The PM can choose to review each pull request or delegate part or all of this duty, however the PM is responsible that all code merged into the *Development* Branch adheres to the **Development Guidelines**
* Each Endpoint should have (minimally) One Unit Test


#### Development Guidelines

The Project will adhere to the Development Standards listed below. If you have any questions beyond the Development Guidelines that fall beyond the scope itemized below please consult the Product Owner.

* Passwords or API Keys will be committed into any file included into the Public Repo
* Development Follow the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) (Covered Day 2)
* [Development Guide: Javascript](https://github.com/airbnb/javascript) (Covered Day 1)
* [Development Guide: React/JSX](https://github.com/airbnb/javascript/tree/master/react) (Covered Day 1)
* [12-Factor Methodology](http://12factor.net/) (Covered Day 3)
* [Semantic Versioning: SemVer](http://semver.org/) (Covered Day 4)

### Features

### Technology Choices

## Frequency Table

| Failure Type | Frequency |
|---|---|
| **Problem Solver** takes a range of time to resolve (randomly) | 2 - 8 hrs |
| **Worker** *Picks* incorrect **Unit** from **Pod** | 1.4% |
| **Worker** *Picks* incorrect **Unit** from **Pod** | 1.4% |
| **Bot** *Procures* Wrong **Pod**| 0.01% |
| **Pod** needs *Critical Service*| 0.05% |
| **Pod** needs *Unscheduled Service*| 0.80% |
| *Scheduled Service* for a **Pod** | Every 10,000 picks |



## Request for Proposal Guidelines

## Budget

## Proposal Qualifications

## Submission Guidelines


## Caveats

Incoming Units Not packaged properly

Amazon Problem Solver
% need QA to fix issue (2hrs - 2days)

QA does a 6 sided Check

Associate

packages
  units

## Stats
1.5 billion for total cyber Monday

Miles of Conveyers

1.2 million sq foot warehouse (non-robotic)

50k seasonal employees

30% better pay for workers than traditional retail

150k sku's for 1 retailer

40 US fulfillment(distribution) centers, 80 total

21 million units in an warehouse

Over 3 mil unique items

1-1.5 hours to process an order (non-robotic)

15 mins (robotic)

426 orders per second clocked on Cyber Monday 2013
Kiva: thousands of pods, 10s of thousands of products

5 min charge for kiva's


99.99% accurate - bots

[
Quiet Logistics, 30k orders per day - Avg of 15m per order -
100 robots, 300 workers
]
