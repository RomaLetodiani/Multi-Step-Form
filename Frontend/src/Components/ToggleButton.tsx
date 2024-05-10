const ToggleButton = ({ value, onChange }: { value: string | number; onChange: () => void }) => {
  return (
    <label className="self-center flex gap-5 items-center cursor-pointer">
      <span className="text-sm font-bold">Monthly</span>
      <input type="checkbox" checked={!!value} onChange={onChange} className="sr-only peer" />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="text-sm font-bold">Yearly</span>
    </label>
  )
}

export default ToggleButton
