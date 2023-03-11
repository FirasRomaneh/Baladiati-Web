import React, { useState } from 'react'
import "./Services.css";
import Services1 from './Services1/Services1';
import Services2 from './Services2/Services2';
import Services3 from './Services3/Services3';
import Services4 from './Services4/Services4';
import Services5 from './Services5/Services5';
import Services6 from './Services6/Services6';
import ServicesMade from './ServicesMade/ServicesMade';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-container">
        <div className={`tab-link ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
          الخدمات المالية
        </div>
        <div className={`tab-link ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
          خدمات الصحة والبيئة
        </div>
        <div className={`tab-link ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
          الشهادات العامة
        </div>
        <div className={`tab-link ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>
          خدمات  الزراعة والبستنة
        </div>
        <div className={`tab-link ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}>
          خدمات الشوارع والطرق
        </div>
        <div className={`tab-link ${activeTab === 6 ? 'active' : ''}`} onClick={() => handleTabClick(6)}>
          خدمات الصرف الصحي والنفايات
        </div>
        <div className={`tab-link ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
          الخدمات المرسلة
        </div>
      </div>
      {activeTab === 0 ? <ServicesMade className="tab-content"/> : ''}
      {activeTab === 1 ? <Services1 className="tab-content"/> : ''}
      {activeTab === 2 ? <Services2 className="tab-content"/> : ''}
      {activeTab === 3 ? <Services3 className="tab-content"/> : ''}
      {activeTab === 4 ? <Services4 className="tab-content"/> : ''}
      {activeTab === 5 ? <Services5 className="tab-content"/> : ''}
      {activeTab === 6 ? <Services6 className="tab-content"/> : ''}
    </div>
  );
}

export default Services