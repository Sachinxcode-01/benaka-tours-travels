import React, { useState } from "react";
import { DollarSign, Save, Edit3, Check } from "lucide-react";
import type { TariffRate } from "../types";

interface TariffManagementProps {
  tariffs: TariffRate[];
  onSaveTariff: (updated: TariffRate) => void;
}

export const TariffManagement: React.FC<TariffManagementProps> = ({
  tariffs,
  onSaveTariff,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TariffRate | null>(null);

  const handleEdit = (t: TariffRate) => {
    setEditingId(t.id);
    setFormData({ ...t });
  };

  const handleSave = () => {
    if (formData) {
      onSaveTariff(formData);
      setEditingId(null);
      setFormData(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121620] p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#D4AF37]" />
            Category Tariff & Rate Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure standard base rates, per-KM fares, driver allowance, and night halt charges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tariffs.map((tariff) => {
          const isEditing = editingId === tariff.id;
          const current = isEditing && formData ? formData : tariff;

          return (
            <div
              key={tariff.id}
              className="bg-[#121620] rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                    Vehicle Category
                  </span>
                  <h3 className="text-lg font-bold text-white">{tariff.category}</h3>
                </div>

                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1 hover:brightness-110 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(tariff)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-200 hover:text-[#D4AF37] font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Tariff</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0B0D12] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-semibold block text-[11px]">
                    Base Fare (80km / 8h)
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={current.baseRate80Km}
                      onChange={(e) =>
                        setFormData({ ...current, baseRate80Km: Number(e.target.value) })
                      }
                      className="w-full mt-1 bg-[#121620] border border-[#D4AF37] rounded-lg px-2 py-1 text-white font-bold text-xs"
                    />
                  ) : (
                    <strong className="text-sm text-[#D4AF37]">₹{current.baseRate80Km}</strong>
                  )}
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-semibold block text-[11px]">
                    Extra Per KM
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={current.extraPerKm}
                      onChange={(e) =>
                        setFormData({ ...current, extraPerKm: Number(e.target.value) })
                      }
                      className="w-full mt-1 bg-[#121620] border border-[#D4AF37] rounded-lg px-2 py-1 text-white font-bold text-xs"
                    />
                  ) : (
                    <strong className="text-sm text-emerald-400">₹{current.extraPerKm} / km</strong>
                  )}
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-semibold block text-[11px]">
                    Driver Beta / Day
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={current.driverAllowancePerDay}
                      onChange={(e) =>
                        setFormData({ ...current, driverAllowancePerDay: Number(e.target.value) })
                      }
                      className="w-full mt-1 bg-[#121620] border border-[#D4AF37] rounded-lg px-2 py-1 text-white font-bold text-xs"
                    />
                  ) : (
                    <strong className="text-sm text-slate-200">₹{current.driverAllowancePerDay}</strong>
                  )}
                </div>

                <div className="bg-[#0B0D12] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-semibold block text-[11px]">
                    Night Halt Charge
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={current.nightHaltCharge}
                      onChange={(e) =>
                        setFormData({ ...current, nightHaltCharge: Number(e.target.value) })
                      }
                      className="w-full mt-1 bg-[#121620] border border-[#D4AF37] rounded-lg px-2 py-1 text-white font-bold text-xs"
                    />
                  ) : (
                    <strong className="text-sm text-slate-200">₹{current.nightHaltCharge}</strong>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
