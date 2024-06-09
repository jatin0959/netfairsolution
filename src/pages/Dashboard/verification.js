import React, { useState,useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';
import { useRouter, } from 'next/router';
import axios from 'axios';


const Verification = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [whatSell, setWhatSell] = useState('');
    const [collectDonations, setCollectDonations] = useState('');
    const [annualTurnover, setAnnualTurnover] = useState('');
    const [businessAge, setBusinessAge] = useState('');
    const [numEmployees, setNumEmployees] = useState('');
    const [hasWebsite, setHasWebsite] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [description, setDescription] = useState('');
    const [pan, setPan] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [registeredAddress, setRegisteredAddress] = useState('');
    const [stateUT, setStateUT] = useState('');
    const [pincode, setPincode] = useState('');
    const [gstin, setGstin] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [confirmBankAccountNumber, setConfirmBankAccountNumber] = useState('');
    const [bankIFSC, setBankIFSC] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const { email } = router.query;

     // File states
     const [panDocument, setPanDocument] = useState(null);
     const [bankDocument, setBankDocument] = useState(null);
     const [businessAddressProof, setBusinessAddressProof] = useState(null);
 
     // File upload URLs
     const [panDocumentURL, setPanDocumentURL] = useState('');
     const [bankDocumentURL, setBankDocumentURL] = useState('');
     const [businessAddressProofURL, setBusinessAddressProofURL] = useState('');

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUser(user.uid);
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
    
      useEffect(() => {
        // Fetch user data from Firestore
        const fetchUserData = async () => {
          try {
            const userRef = firebase.firestore().collection("users").doc(user);
            const doc = await userRef.get();
            if (doc.exists) {
              setUserData(doc.data());
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, [user]);

    const subCategories = {
        Events: ['Allumni Meets', 'Charity'],
        'IT and Software': ['Ecommerce', 'Computer Security']
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory('');
    };
    const handleNextStep = () => {
        const requiredFields = {
            1: [category, subCategory, whatSell, collectDonations, annualTurnover, businessAge, numEmployees, hasWebsite, description],
            2: [pan, businessName, registeredAddress, stateUT, pincode],
            3: [bankAccountNumber, confirmBankAccountNumber, bankIFSC],
            4: [selectedDocument] // Assuming at least one document is required
        };
    
        const isAnyFieldEmpty = requiredFields[step].some(field => !field);
        if (isAnyFieldEmpty) {
            toast.error("Please fill in all required fields", { position: "top-right" });
            return;
        }
    
        // Check if bank account numbers match
        if (bankAccountNumber !== confirmBankAccountNumber) {
            toast.error("Bank account numbers do not match", { position: "top-right" });
            return;
        }
        
        setStep(step + 1);
    };
    

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const stateUTOptions = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli',
        'Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ];

    const handlePanDocumentUpload = (e) => {
        const file = e.target.files[0];
        setPanDocument(file);
    };

    const handleBankDocumentUpload = (e) => {
        const file = e.target.files[0];
        setBankDocument(file);
    };

    const handleBusinessAddressProofUpload = (e) => {
        const file = e.target.files[0];
        setBusinessAddressProof(file);
    };

    // const handleFormSubmission = async () => {
    //     setLoading(true);
    //     try {
    //         // Upload files to Firebase Storage
    //         const panDocRef = firebase.storage().ref().child(`panDocuments/${user}/${panDocument.name}`);
    //         const bankDocRef = firebase.storage().ref().child(`bankDocuments/${user}/${bankDocument.name}`);
    //         const businessAddressProofRef = firebase.storage().ref().child(`businessAddressProof/${user}/${businessAddressProof.name}`);
            
    //         await panDocRef.put(panDocument);
    //         await bankDocRef.put(bankDocument);
    //         await businessAddressProofRef.put(businessAddressProof);

    //         // Get download URLs
    //         const panDocURL = await panDocRef.getDownloadURL();
    //         const bankDocURL = await bankDocRef.getDownloadURL();
    //         const businessAddressProofURL = await businessAddressProofRef.getDownloadURL();

    //         // Store form data and URLs in Firestore
    //         await firebase.firestore().collection("users").doc(user).collection("kycdetails").add({
    //             category,
    //             subCategory,
    //             whatSell,
    //             collectDonations,
    //             annualTurnover,
    //             businessAge,
    //             numEmployees,
    //             hasWebsite,
    //             websiteUrl,
    //             description,
    //             pan,
    //             businessName,
    //             registeredAddress,
    //             stateUT,
    //             pincode,
    //             gstin,
    //             bankAccountNumber,
    //             confirmBankAccountNumber,
    //             bankIFSC,
    //             selectedDocument,
    //             panDocumentURL: panDocURL,
    //             bankDocumentURL: bankDocURL,
    //             businessAddressProofURL: businessAddressProofURL,
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //         });
    //         const userRef = firebase.firestore().collection("users").doc(user);
    //         await userRef.update({
    //           kycverification: "true"
    //         });

    //         // Notify success
    //         toast.success("KYC details submitted successfully", { position: "top-right" });
    //         router.push('/Dashboard');
    //     } catch (error) {
    //         console.error("Error submitting KYC:", error);
            
    //     }
    //     setLoading(false);
    // };




const handleFormSubmission = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('collectDonations', collectDonations);
    formData.append('annualTurnover', annualTurnover);
    formData.append('businessAge', businessAge);
    formData.append('numEmployees', numEmployees);
    formData.append('hasWebsite', hasWebsite);
    formData.append('websiteUrl', websiteUrl);
    formData.append('description', description);
    formData.append('pan', pan);
    formData.append('businessName', businessName);
    formData.append('registeredAddress', registeredAddress);
    formData.append('stateUT', stateUT);
    formData.append('pincode', pincode);
    formData.append('gstin', gstin);
    formData.append('bankAccountNumber', bankAccountNumber);
    formData.append('bankIFSC', bankIFSC);
    formData.append('email', email);

    if (panDocument) {
        formData.append('panDocument', panDocument);
    }
    if (selectedDocument) {
        formData.append('selectedDocument', selectedDocument);
    }
    if (bankDocument) {
        formData.append('bankDocument', bankDocument);
    }
    if (businessAddressProof) {
        formData.append('businessAddressProof', businessAddressProof);
    }

    try {
        const response = await axios.post('http://localhost:5000/api/verification/submit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setTimeout(() => {
            setLoading(false);
            toast.success('Form submitted successfully!');
        }, 2000);
        // Handle success (e.g., show a success message)
    } catch (error) {
        console.error('There was an error submitting the form!', error);
        setLoading(false);
        // Handle error (e.g., show an error message)
    }
};

    return (
        <div className='min-h-screen'>
            <div className='lg:ml-64'>
                <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
                    <div className="bg-blue-800 px-10 py-10 text-center text-white">
                        <p className="font-serif text-2xl font-semibold text-white tracking-wider">Submit your KYC</p>
                        <div className="max-w-sm mx-auto px-4 font-[sans-serif]">
                            <h4 className="text-sm text-white font-semibold">
                                {step === 1 ? '1/5 : Step 1: About your business' : 
                                    step === 2 ? '2/5 : Step 2: More business details' :
                                    step === 3 ? '3/5 : Step 3: Bank account details' :
                                    '4/5 : Step 4: Upload your documents'}
                            </h4>
                            <div className="flex items-start gap-3 mt-2">
                                <div className={`w-full h-1 rounded-xl ${step === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                <div className={`w-full h-1 rounded-xl ${step === 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                <div className={`w-full h-1 rounded-xl ${step === 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                <div className={`w-full h-1 rounded-xl ${step === 4 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-8 py-10">
                        {step === 1 && (
                            <>
                                <label className="block" htmlFor="category">
                                    <p className="text-gray-600">What is the category of your business?</p>
                                    <select
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={category}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">Select category</option>
                                        <option value="Events">Events</option>
                                        <option value="IT and Software">IT and Software</option>
                                    </select>
                                </label>

                                {category && (
                                    <label className="block" htmlFor="subCategory">
                                        <p className="text-gray-600">What sub-category is your business in?</p>
                                        <select
                                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                        >
                                            <option value="">Select sub-category</option>
                                            {subCategories[category].map((subCat) => (
                                                <option key={subCat} value={subCat}>{subCat}</option>
                                            ))}
                                        </select>
                                    </label>
                                )}

                                <label className="block" htmlFor="whatSell">
                                    <p className="text-gray-600">What do you sell?</p>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="radio"
                                            id="services"
                                            name="whatSell"
                                            value="services"
                                            checked={whatSell === 'services'}
                                            onChange={() => setWhatSell('services')}
                                        />
                                        <label htmlFor="services">Services</label>
                                        <input
                                            type="radio"
                                            id="products"
                                            name="whatSell"
                                            value="products"
                                            checked={whatSell === 'products'}
                                            onChange={() => setWhatSell('products')}
                                        />
                                        <label htmlFor="products">Products</label>
                                        <input
                                            type="radio"
                                            id="others"
                                            name="whatSell"
                                            value="others"
                                            checked={whatSell === 'others'}
                                            onChange={() => setWhatSell('others')}
                                        />
                                        <label htmlFor="others">Others</label>
                                    </div>
                                </label>

                                <label className="block" htmlFor="collectDonations">
                                    <p className="text-gray-600">Do you plan to collect donations?</p>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="radio"
                                            id="Yes"
                                            name="collectDonations"
                                            value="Yes"
                                            checked={collectDonations === 'Yes'}
                                            onChange={() => setCollectDonations('Yes')}
                                        />
                                        <label htmlFor="Yes">Yes</label>
                                        <input
                                            type="radio"
                                            id="No"
                                            name="collectDonations"
                                            value="No"
                                            checked={collectDonations === 'No'}
                                            onChange={() => setCollectDonations('No')}
                                        />
                                        <label htmlFor="No">No</label>
                                    </div>
                                </label>

                                <label className="block" htmlFor="annualTurnover">
                                    <p className="text-gray-600">Approximate Annual Turnover?</p>
                                    <select
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={annualTurnover}
                                        onChange={(e) => setAnnualTurnover(e.target.value)}
                                    >
                                        <option value="">Select turnover range</option>
                                        <option value="10k-1lakh">10k - 1 lakh</option>
                                        <option value="1lakh-5lakh">1 lakh - 5 lakh</option>
                                    </select>
                                </label>

                                <label className="block" htmlFor="businessAge">
                                    <p className="text-gray-600">How old is your business?</p>
                                    <select
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={businessAge}
                                        onChange={(e) => setBusinessAge(e.target.value)}
                                    >
                                        <option value="">Select business age</option>
                                        <option value="1-2 years">1-2 years</option>
                                        <option value="2-5 years">2-5 years</option>
                                    </select>
                                </label>

                                <label className="block" htmlFor="numEmployees">
                                    <p className="text-gray-600">Number of Employees</p>
                                    <select
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={numEmployees}
                                        onChange={(e) => setNumEmployees(e.target.value)}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="1-5 employee">1-5 employee</option>
                                        <option value="5-20 years">2-20 employee</option>
                                    </select>
                                </label>

                                <label className="block" htmlFor="hasWebsite">
    <p className="text-gray-600">Do you have a Website?</p>
    <div className="flex items-center space-x-4">
        <input
            type="radio"
            id="Yes"
            name="hasWebsite"
            value="Yes"
            checked={hasWebsite === 'Yes'}
            onChange={() => setHasWebsite('Yes')}
        />
        <label htmlFor="Yes">Yes</label>
        <input
            type="radio"
            id="No"
            name="hasWebsite"
            value="No"
            checked={hasWebsite === 'No'}
            onChange={() => setHasWebsite('No')}
        />
        <label htmlFor="No">No</label>
    </div>
</label>

{hasWebsite === 'Yes' && (
    <label className="block" htmlFor="websiteUrl">
        <p className="text-gray-600">Enter your website URL:</p>
        <input
            type="text"
            id="websiteUrl"
            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
        />
    </label>
)}


                                <label className="block" htmlFor="description">
                                    <p className="text-gray-600">Description</p>
                                    <textarea
                                        className="w-full rounded-md h-48 border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description"
                                    ></textarea>
                                </label>

                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handleNextStep}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <label className="block" htmlFor="pan">
                                    <p className="text-gray-600">PAN for business</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={pan}
                                        onChange={(e) => setPan(e.target.value)}
                                        placeholder="Enter PAN"
                                    />
                                </label>

                                <label className="block" htmlFor="businessName">
                                    <p className="text-gray-600">Name of the business</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="Enter business name"
                                    />
                                </label>

                                <label className="block" htmlFor="registeredAddress">
                                    <p className="text-gray-600">Registered business address</p>
                                    <textarea
                                        className="w-full rounded-md h-32 border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={registeredAddress}
                                        onChange={(e) => setRegisteredAddress(e.target.value)}
                                        placeholder="Enter registered address"
                                    ></textarea>
                                </label>

                                <label className="block" htmlFor="stateUT">
                                    <p className="text-gray-600">State/UT</p>
                                    <select
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={stateUT}
                                        onChange={(e) => setStateUT(e.target.value)}
                                    >
                                        <option value="">Select state/UT</option>
                                        {stateUTOptions.map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block" htmlFor="pincode">
                                    <p className="text-gray-600">Pincode</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        placeholder="Enter pincode"
                                    />
                                </label>

                                <label className="block" htmlFor="gstin">
                                    <p className="text-gray-600">GSTIN (optional)</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={gstin}
                                        onChange={(e) => setGstin(e.target.value)}
                                        placeholder="Enter GSTIN"
                                    />
                                </label>

                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handlePreviousStep}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handleNextStep}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <label className="block" htmlFor="bankAccountNumber">
                                    <p className="text-gray-600">Bank Account Number</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={bankAccountNumber}
                                        onChange={(e) => setBankAccountNumber(e.target.value)}
                                        placeholder="Enter Bank Account Number"
                                    />
                                </label>

                                <label className="block" htmlFor="confirmBankAccountNumber">
                                    <p className="text-gray-600">Confirm Bank Account Number</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={confirmBankAccountNumber}
                                        onChange={(e) => setConfirmBankAccountNumber(e.target.value)}
                                        placeholder="Re-enter Bank Account Number"
                                    />
                                </label>

                                <label className="block" htmlFor="businessName">
                                    <p className="text-gray-600">Account must belong to:</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="Enter business name"
                                    />
                                </label>

                                <label className="block" htmlFor="bankIFSC">
                                    <p className="text-gray-600">Bank IFSC Code</p>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                                        value={bankIFSC}
                                        onChange={(e) => setBankIFSC(e.target.value)}
                                        placeholder="Enter Bank IFSC Code"
                                    />
                                </label>

                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handlePreviousStep}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handleNextStep}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <label className="block" htmlFor="panDocument">
                                    <p className="text-gray-600">Upload PAN Card</p>
                                    <input
                                    onChange={handlePanDocumentUpload}
                                        type="file"
                                        id="panDocument"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                       
                                    />
                                </label>

                                <label className="block" htmlFor="bankDocument">
                                    <p className="text-gray-600">Select Bank Document</p>
                                    <select
                                        value={selectedDocument}
                                        onChange={(e) => setSelectedDocument(e.target.value)}
                                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"

                                    >
                                        <option value="">Select document type</option>
                                        <option value="cancelledCheck">Cancelled Check</option>
                                        <option value="bankStatement">Bank Statement for last 6 months</option>
                                    </select>
                                </label>

                                <label className="block" htmlFor="bankDocument">
                                    <p className="text-gray-600">Bank document</p>
                                    <input
                                        type="file"
                                        id="bankDocument"
                                        onChange={handleBankDocumentUpload}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                       
                                    />
                                </label>
                                <label className="block" htmlFor="businessAddressProof">
                                    <p className="text-gray-600">Upload Business Address Proof</p>
                                    <input
                                        type="file"
                                        id="businessAddressProof"
                                        onChange={handleBusinessAddressProofUpload}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                       
                                    />
                                </label>

                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                                        onClick={handlePreviousStep}
                                    >
                                        Previous
                                    </button>
                                    <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none `}
                onClick={handleFormSubmission}
                disabled={loading}
            >
                {loading ? 'Submiting...' : 'Submit'} {/* Show loading indicator */}
            </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Verification;
