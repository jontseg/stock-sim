// src/apiClient.ts
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
// Generate the client once
const client = generateClient<Schema>();

export default client;
