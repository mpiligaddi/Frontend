import firebase from 'firebase';
import { useMutation } from 'react-query';

export type CreateClientFields = {
  CUIT: string;
  ID: string;
  address: string;
  adminId?: string;
  categories: {
    value: string;
  }[];
  comercialId?: string;
  companyName: string;
  contactName: string;
  control: boolean;
  description: string;
  email: string;
  name: string;
  phone: string;
};

export const useCreateClient = () => {
  const createClient = async ({
    categories,
    ...client
  }: CreateClientFields) => {
    await firebase
      .firestore()
      .collection('clients')
      .add({
        ...client,
        existencia: true
      });

    await firebase
      .firestore()
      .collection('users')
      .add({
        displayName: client.name,
        email: client.email,
        password: `${client.email?.split('@')[0]}1234`,
        role: 'client',
        key: 'd2a04d71301a8915217dd5faf81d12cffd6cd958',
        ID: client.ID
      }),
      await Promise.all(
        categories.map(async (category, index) => {
          firebase
            .firestore()
            .collection('categories')
            .add({
              ID: `CAT${index + 1}`,
              name: category.value,
              clientId: client.ID
            });
        })
      );
  };

  return useMutation(createClient);
};
