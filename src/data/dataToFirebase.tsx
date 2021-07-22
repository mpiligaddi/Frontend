import { useEffect } from 'react';
import firebase from 'firebase/app';
// import zones from '../data/zones'
// import admins from '../data/admins'
import branches from './branches';
// import categories from './categories'
// import chains from '../data/chains'
// import clients from '../data/clients'
// import supervisors from '../data/supervisors'
// import coordinators from '../data/coordinators'
// import comercials from '../data/comercials'
// import coverages from '../data/coverage'
// import merchandisers from '../data/merchandisers'
// //import catxchains from '../data/catxchain'

const JsonToFirebase = () => {
  const uploadData = () => {
    //     // ZONES
    //          {zones.map(zone => {
    //             firebase.db.collection("zones").add({
    //                 ID: zone.ID,
    //                 name: zone.name,
    //                 region: zone.region,
    //                 supervisorId: zone.supervisorId,
    //             })
    //             .then(docRef => {
    //                 console.log("Doc written with ID" + docRef.ID)
    //             })
    //             .catch(error => {
    //                 console.log("Error: " + error)
    //             })
    //         })
    //     }
    //     //BRANCHES
    branches.map(branch => {
      firebase
        .firestore()
        .collection('branches')
        .add({
          ID: branch.ID,
          chainId: branch.chainId,
          chainName: branch.chainName,
          name: branch.name,
          address: branch.address,
          zoneId: branch.zoneId,
          locality: branch.locality,
          region: branch.region
        })
        .then(docRef => {
          console.log('Doc written with ID' + docRef.id);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    });
    //     //CATEGORIES
    //         categories.map(category => {
    //         firebase.db.collection("categories").add({
    //             ID: category.ID,
    //             clientId: category.clientId,
    //             name: category.name,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //     //CATEGORIES X CHAIN (por ahora no se usa)
    //     //     catxchains.map(catxchain => {
    //     //     firebase.db.collection("catxchains").add({
    //     //         ID: catxchain.ID,
    //     //         chainId: catxchain.chainId,
    //     //         categoryId: catxchain.categoryId,
    //     //     })
    //     //     .then(docRef => {
    //     //         console.log("Doc written with ID" + docRef.ID)
    //     //     })
    //     //     .catch(error => {
    //     //         console.log("Error: " + error)
    //     //     })
    //     // })
    //     //  CHAINS
    //         chains.map(chain => {
    //         firebase.db.collection("chains").add({
    //             ID: chain.ID,
    //             name: chain.name,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //     //CLIENTS
    //         clients.map(client => {
    //         firebase.db.collection("clients").add({
    //             ID: client.ID,
    //             companyName: client.companyName,
    //             name: client.name,
    //             adminId: client.adminId,
    //             comercialId: client.comercialId,
    //             address: client.address,
    //             CUIT: client.CUIT,
    //             contactName: client.contactName,
    //             periodReportId: client.periodReportId,
    //             control: client.control,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })

    //     ////**PEOPLE **////
    //     //ADMINS
    //         admins.map(admin => {
    //         firebase.db.collection("admins").add({
    //             ID: admin.ID,
    //             name: admin.name,
    //             email: admin.email,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //     //COMERCIALS
    //         comercials.map(comercial => {
    //         firebase.db.collection("comercials").add({
    //             ID: comercial.ID,
    //             name: comercial.name,
    //             email: comercial.email,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //      //COORDINATORS
    //         coordinators.map(coordinator => {
    //         firebase.db.collection("coordinators").add({
    //             ID: coordinator.ID,
    //             name: coordinator.name,
    //             email: coordinator.email,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //     //MERCHANDISERS
    //             merchandisers.map(merch => {
    //             firebase.db.collection("merchandisers").add({
    //                 ID: merch.ID,
    //                 name: merch.name,
    //                 email: merch.email,
    //                 supervisorId: merch.supervisorId,
    //             })
    //             .then(docRef => {
    //                 console.log("Doc written with ID" + docRef.ID)
    //             })
    //             .catch(error => {
    //                 console.log("Error: " + error)
    //             })
    //         })
    //     //SUPERVISORS
    //         supervisors.map(supervisor => {
    //         firebase.db.collection("supervisors").add({
    //             ID: supervisor.ID,
    //             name: supervisor.name,
    //             email: supervisor.email,
    //             coordinatorId: supervisor.coordinatorId,
    //         })
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //         })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
    //     //COVERAGES
    //         coverages.map(coverage => {
    //         firebase.db.collection("coverages").add({
    //             clientId: coverage.clientId,
    //             branchId: coverage.branchId,
    //             frequency: coverage.frequency,
    //             intensity: coverage.intensity,
    //             }
    //         )
    //         .then(docRef => {
    //             console.log("Doc written with ID" + docRef.ID)
    //     })
    //         .catch(error => {
    //             console.log("Error: " + error)
    //         })
    //     })
  };

  useEffect(() => {
    uploadData();
  }, []);

  return (
    <div>
      <p>Cargando datos..</p>
    </div>
  );
};

export default JsonToFirebase;
