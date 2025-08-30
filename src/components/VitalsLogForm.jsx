import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Droplet, FileText } from 'lucide-react';
import { logVitals } from '../services/loggingService.jsx';

const VitalsLogForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    systolic: '',
    diastolic: '',
    glucose: '',
    weight: '',
    triglycerides: '',
    ggt: '',
    waistCircumference: '',
    waistToHipRatio: '',
    notes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.systolic && !form.diastolic && !form.glucose && !form.weight && !form.triglycerides && !form.ggt && !form.waistCircumference && !form.waistToHipRatio) {
      alert('Please fill in at least one vital measurement');
      return;
    }
    
    const vitalsData = {
      ...form,
      systolic: form.systolic ? parseInt(form.systolic) : null,
      diastolic: form.diastolic ? parseInt(form.diastolic) : null,
      glucose: form.glucose ? parseInt(form.glucose) : null,
      weight: form.weight ? parseFloat(form.weight) : null,
      triglycerides: form.triglycerides ? parseInt(form.triglycerides) : null,
      ggt: form.ggt ? parseInt(form.ggt) : null,
      waistCircumference: form.waistCircumference ? parseFloat(form.waistCircumference) : null,
      waistToHipRatio: form.waistToHipRatio ? parseFloat(form.waistToHipRatio) : null,
      timestamp: new Date()
    };
    
    logVitals(vitalsData);
    
    // Reset form
    setForm({
      systolic: '',
      diastolic: '',
      glucose: '',
      weight: '',
      triglycerides: '',
      ggt: '',
      waistCircumference: '',
      waistToHipRatio: '',
      notes: ''
    });
    
    if (onSuccess) onSuccess();
  };
  
  // Helper function to determine BP status
  const getBPStatus = () => {
    if (!form.systolic || !form.diastolic) return null;
    
    const systolic = parseInt(form.systolic);
    const diastolic = parseInt(form.diastolic);
    
    if (systolic < 120 && diastolic < 80) {
      return { label: 'Normal', color: 'text-green-500' };
    } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
      return { label: 'Elevated', color: 'text-yellow-500' };
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      return { label: 'Stage 1 Hypertension', color: 'text-orange-500' };
    } else if (systolic >= 140 || diastolic >= 90) {
      return { label: 'Stage 2 Hypertension', color: 'text-red-500' };
    }
    
    return null;
  };
  
  // Helper function to determine glucose status
  const getGlucoseStatus = () => {
    if (!form.glucose) return null;
    
    const glucose = parseInt(form.glucose);
    
    if (glucose < 70) {
      return { label: 'Low', color: 'text-orange-500' };
    } else if (glucose >= 70 && glucose <= 99) {
      return { label: 'Normal', color: 'text-green-500' };
    } else if (glucose >= 100 && glucose <= 125) {
      return { label: 'Prediabetes', color: 'text-yellow-500' };
    } else if (glucose >= 126) {
      return { label: 'Diabetes range', color: 'text-red-500' };
    }
    
    return null;
  };
  
  const bpStatus = getBPStatus();
  const glucoseStatus = getGlucoseStatus();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-login p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-red-600 to-pink-500">Log Vitals</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Blood Pressure</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="number"
                  name="systolic"
                  value={form.systolic}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  placeholder="Systolic"
                  min="70"
                  max="200"
                />
                <span className="text-xs text-slate-500 absolute -bottom-5 left-0">Systolic</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="diastolic"
                  value={form.diastolic}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  placeholder="Diastolic"
                  min="40"
                  max="120"
                />
                <span className="text-xs text-slate-500 absolute -bottom-5 left-0">Diastolic</span>
              </div>
            </div>
            {bpStatus && (
              <div className={`text-xs mt-6 ${bpStatus.color}`}>
                {bpStatus.label}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Blood Glucose (mg/dL)</label>
            <div className="relative">
              <Droplet className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="glucose"
                value={form.glucose}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 95"
                min="40"
                max="400"
              />
            </div>
            {glucoseStatus && (
              <div className={`text-xs mt-2 ${glucoseStatus.color}`}>
                {glucoseStatus.label}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Weight (kg)</label>
            <div className="relative">
              <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 65.5"
                step="0.1"
                min="30"
                max="200"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Triglycerides (mg/dL)</label>
            <div className="relative">
              <Droplet className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="triglycerides"
                value={form.triglycerides}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 150"
                min="30"
                max="1000"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">GGT (U/L)</label>
            <div className="relative">
              <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="ggt"
                value={form.ggt}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 25"
                min="5"
                max="300"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Waist Circumference (cm)</label>
            <div className="relative">
              <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="waistCircumference"
                value={form.waistCircumference}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 85"
                step="0.1"
                min="50"
                max="150"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Waist-to-Hip Ratio</label>
            <div className="relative">
              <Activity className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="number"
                name="waistToHipRatio"
                value={form.waistToHipRatio}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="e.g., 0.85"
                step="0.01"
                min="0.5"
                max="1.5"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-slate-700 mb-1">Notes</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white/70 backdrop-blur-sm"
                placeholder="Optional"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-2">
          <motion.button
            type="button"
            onClick={() => onSuccess()}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Vitals
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default VitalsLogForm;