# LendPro - Decentralized Lending Protocol

LendPro is a decentralized lending protocol built for cooperatives on the Neutron blockchain. It enables users to create, join, and manage cooperatives, as well as participate in lending and borrowing activities.

## Features

- Create and manage cooperatives
- Join existing cooperatives
- Borrow and repay funds
- Create and vote on proposals
- Manage token allowances
- View cooperative details and lending activities
- Withdraw funds and weights
- Execute approved proposals

## Tech Stack

- React 18.3.1
- Vite 5.4.10
- TailwindCSS 3.4.15
- CosmJS (@cosmjs/cosmwasm-stargate, @cosmjs/proto-signing, @cosmjs/stargate)
- Keplr Wallet Integration
- React Router DOM 6.28.0

## Prerequisites

- Node.js (Latest LTS version recommended)
- Keplr Wallet browser extension
- Access to Neutron blockchain (pion-1 testnet)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lendpro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Setup

The application connects to the following Neutron testnet endpoints:

- Chain ID: `pion-1`
- RPC Endpoint: `https://rpc-palvus.pion-1.ntrn.tech`
- Contract Address: `neutron16qhawx7cy6cmte2jluu39d6j09emzml5yvmhdglyz0re99v6wpms0rh63m`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
├── pages/
│   ├── LandingPage.jsx
│   ├── Dashboard.jsx
│   ├── CreateCooperative.jsx
│   ├── BorrowFunds.jsx
│   ├── RepayFund.jsx
│   └── ...
├── App.jsx
└── main.jsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


