import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Droplet, Activity, Calendar } from 'lucide-react';

const ReportsPage = () => {
  const [form, setForm] = useState({
    date: '',
    fastingGlucose: '',
    hba1c: '',
    systolic: '',
    diastolic: '',
    ldl: '',
    hdl: '',
    triglycerides: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const reportData = {
      ...form,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'blood_test'
    };
    
    const existingReports = JSON.parse(localStorage.getItem('bloodTestReports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('bloodTestReports', JSON.stringify(existingReports));
    
    // Reset form
    setForm({
      date: '',
      fastingGlucose: '',
      hba1c: '',
      systolic: '',
      diastolic: '',
      ldl: '',
      hdl: '',
      triglycerides: '',
      notes: '',
    });
    
    alert('Blood test report saved successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Enter Test Report</h1>
          <p className="text-slate-600">Record lab values like glucose, HbA1c, BP, and lipids</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glassmorphism-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">Fasting Glucose (mg/dL)</label>
              <input name="fastingGlucose" type="number" value={form.fastingGlucose} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">HbA1c (%)</label>
              <input name="hba1c" type="number" step="0.1" value={form.hba1c} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">BP Systolic (mmHg)</label>
              <input name="systolic" type="number" value={form.systolic} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">BP Diastolic (mmHg)</label>
              <input name="diastolic" type="number" value={form.diastolic} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">Triglycerides (mg/dL)</label>
              <input name="triglycerides" type="number" value={form.triglycerides} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-1">LDL (mg/dL)</label>
              <input name="ldl" type="number" value={form.ldl} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">HDL (mg/dL)</label>
              <input name="hdl" type="number" value={form.hdl} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Notes</label>
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white" placeholder="Optional notes about this report" />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save Report</button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ReportsPage;


