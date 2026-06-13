import { config } from '@/xedo.config';
import { Icons } from '@/components/icons';

export const metadata = {
  title: `Contact | ${config.storeName}`,
};

export default function ContactPage() {
  const rows = [
    { Icon: Icons.Pin, label: 'Adresse', value: config.address },
    { Icon: Icons.Phone, label: 'Téléphone', value: config.phone },
    { Icon: Icons.Clock, label: 'Horaires', value: config.openingHours },
  ];

  return (
    <div className="mx-auto max-w-narrow px-6 pb-20 pt-8">
      <h1 className="mb-2 font-heading text-4xl font-extrabold tracking-tight">
        Nous contacter
      </h1>
      <p className="mb-7 font-body text-lg text-sand-600">
        Une question, une réservation de table ? Passez nous voir ou appelez-nous.
      </p>
      <div className="flex flex-col gap-3.5">
        {rows.map(({ Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-lg border border-sand-200 bg-[#f5f0e8] px-[22px] py-5"
          >
            <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-xedo-50 text-primary">
              <Icon size={20} />
            </span>
            <div>
              <div className="mb-0.5 text-xs uppercase tracking-wide text-sand-500">
                {label}
              </div>
              <div className="font-heading text-lg font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
