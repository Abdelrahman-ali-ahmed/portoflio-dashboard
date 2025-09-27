import { FiCalendar } from "react-icons/fi";
import Loading from "../../../../component/loading";
import useEditexperience from "./hooks/useEditexperience";

export default function EditExperience() {
      const {
        form,
        setForm,
        handleSubmit,
        loadingComponenet,
        id,
        navigate,
        startRef,
        endRef,
        isDark,
        inputClass,
        openPicker,
      } = useEditexperience ();
    
    
    
      if (loadingComponenet) {
        return (
          <div className="w-full h-screen flex justify-center items-center">
            <Loading  />
          </div>
        );
      }
    
  return (
    
    <div
      className={`${
        isDark ? "bg-white text-black" : "bg-black text-white"
      } shadow-md rounded-xl p-4 w-full max-w-3xl mx-auto mb-6 space-y-4 border dark:border-gray-700`}
    >
      <h1 className="text-2xl font-bold mb-4">
         Edit Experience
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Name, Field, Place */}
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className={inputClass}
        />
        <input
          type="text"
          value={form.field}
          onChange={(e) => setForm({ ...form, field: e.target.value })}
          placeholder="Field"
          className={inputClass}
        />
        <input
          type="text"
          value={form.place}
          onChange={(e) => setForm({ ...form, place: e.target.value })}
          placeholder="Place"
          className={`${inputClass} col-span-2`}
        />

        {/* Date Pickers */}
      <div className="flex justify-between gap-4 w-full col-span-2">
  {/* Start Date */}
  <div className="relative w-full">
    <input
      ref={startRef}
      id="startDate"
      type="date"
      value={form.startDate}
      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      className={`${inputClass} appearance-none pr-10 input-no-calendar`}
    />
    <button
      type="button"
      onClick={() => openPicker(startRef)}
      aria-label="Open start date picker"
      className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center ${isDark ? "text-white" : "text-black"}  hover:text-blue-500 transition`}
    >
      <FiCalendar size={18} />
    </button>
  </div>

  {/* End Date */}
  <div className="relative w-full">
    <input
      ref={endRef}
      id="endDate"
      type="date"
      value={form.endDate}
      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      className={`${inputClass} appearance-none pr-10 input-no-calendar`}
    />
    <button
      type="button"
      onClick={() => openPicker(endRef)}
      aria-label="Open end date picker"
      className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center ${isDark ? "text-white" : "text-black"}  hover:text-blue-500 transition`}
    >
      <FiCalendar size={18} />
    </button>
  </div>
</div>


       

        {/* Radio Buttons */}
        <div className="col-span-2 flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isPresent"
              checked={form.isPresent === true}
              onChange={() => setForm({ ...form, isPresent: true })}
            />
            Present
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isPresent"
              checked={form.isPresent === false}
              onChange={() => setForm({ ...form, isPresent: false })}
            />
            Not Present
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSubmit}
          disabled={loadingComponenet}
          className={`border border-transparent font-bold ${
            isDark
              ? "bg-black text-white hover:bg-white hover:text-black hover:border-black"
              : "bg-white text-black hover:bg-black hover:text-white hover:border-white"
          } px-6 py-2 rounded transition`}
        >
          {loadingComponenet ? "Saving..." : id ? "Save Changes" : "Add"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`font-bold border px-6 py-2 rounded transition ${
            isDark
              ? "hover:bg-black hover:text-white"
              : "hover:bg-white hover:text-black"
          }`}
        >
          Back
        </button>
      </div>
    </div>
  )
}
