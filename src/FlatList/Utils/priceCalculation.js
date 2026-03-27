export const calculateTotalPrice = (jobs) => {
    let totalPrice = 0;
  
    jobs?.forEach((job) => {
      const quotation = job?.quotation;
     
      if (quotation?.residential_job) {
        const residentialJobs = JSON.parse(quotation.residential_job);
        residentialJobs?.forEach((residentialJob) => {
          totalPrice += parseFloat(residentialJob.price) || 0;
        });
      }
  
      if (quotation?.commercial_job) {
        const commercialJobs = JSON.parse(quotation.commercial_job);
        commercialJobs?.forEach((commercialJob) => {
          totalPrice += parseFloat(commercialJob.price) || 0;
        });
      }
  
      if (quotation?.storefront_job) {
        const storefrontJobs = JSON.parse(quotation.storefront_job);
        storefrontJobs?.forEach((storefrontJob) => {
          totalPrice += parseFloat(storefrontJob.price) || 0;
        });
      }
    });
  
    return totalPrice;
  };
  
  export const calculateJobPrice = (job) => {
    let totalPrice = 0;
    const quotation = job?.quotation;
    
    if (quotation?.category_type === "residential") {
      if (quotation?.residential_job) {
        const residentialJobs = JSON.parse(quotation.residential_job);
        residentialJobs?.forEach((residentialJob) => {
          totalPrice += parseFloat(residentialJob.price) || 0;
        });
      }
    }
    else if (quotation?.category_type === "storefront") {
      if (quotation?.storefront_job) {
        const storefrontJobs = JSON.parse(quotation.storefront_job);
        storefrontJobs?.forEach((storefrontJob) => {
          totalPrice += parseFloat(storefrontJob.price) || 0;
        });
      }
    }
    else if (quotation?.category_type === "commercial") {
      if (quotation?.commercial_job) {
        const commercialJobs = JSON.parse(quotation.commercial_job);
        commercialJobs?.forEach((commercialJob) => {
          totalPrice += parseFloat(commercialJob.price) || 0;
        });
      }
    }
  
    return totalPrice;
  };