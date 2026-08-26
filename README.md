# 🛒 E-Commerce Micro Frontend Application

A scalable e-commerce application built using **Angular** and **Micro Frontend architecture** with **Module Federation**.

The application is designed to demonstrate how a large e-commerce application can be divided into independent feature-based Micro Frontends while maintaining a central Host application.

---

## 🚀 Project Overview

This project demonstrates a modern **Micro Frontend architecture** for an e-commerce application.

The application consists of:

- **Host Application** – Main shell application responsible for application layout, navigation, and integration.
- **Remote Applications** – Independent feature applications that can be developed and deployed separately.
- **Reusable UI Components** – Common components such as Navbar, Dashboard cards, Product cards, and Order components.

---

## 🏗️ Architecture

```text
                  E-Commerce Micro Frontend
                           │
                           ▼
                  ┌──────────────────┐
                  │  Host Application │
                  │     Angular      │
                  └────────┬─────────┘
                           │
                ┌──────────┼──────────┐
                │          │          │
                ▼          ▼          ▼
          ┌──────────┐ ┌──────────┐ ┌──────────┐
          │ Products │ │  Orders  │ │  Future  │
          │   MFE    │ │   MFE    │ │ Features │
          └──────────┘ └──────────┘ └──────────┘