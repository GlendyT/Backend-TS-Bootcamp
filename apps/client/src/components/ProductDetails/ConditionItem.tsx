import { formatCurrency } from '@/helpers/index'
import { Condition } from '@/types/index'
import TitleStyles from '@/utils/TitlesStyles'

type ProductCardProps = {
  statusVinyl: Condition
}

export default function ConditionItem({ statusVinyl }: ProductCardProps) {
  const { id, condition, price } = statusVinyl

  return (
    <>
      <div key={id}>
        <div className="flex flex-col font-extrabold  italic text-2xl items-end justify-end">
          <TitleStyles label="Condition:" data={condition} />

          <div className=" px-2 flex items-end justify-end max-sm:h-24 text-slate-200">
            {formatCurrency(price)}
          </div>
        </div>
      </div>
    </>
  )
}
