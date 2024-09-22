type TitlesStylesProps = {
  label: string
  data: string
}
export default function TitleStyles({ label, data }: TitlesStylesProps) {
  return (
    <div className="flex flex-row font-extrabold italic items-center justify-center">
      <p className="font-extrabold text-gray-400 italic text-base max-sm:text-xs">
        {label}
      </p>
      <p className="font-extrabold text-slate-200 italic text-xl max-sm:text-xs">
        {data}
      </p>
    </div>
  )
}
