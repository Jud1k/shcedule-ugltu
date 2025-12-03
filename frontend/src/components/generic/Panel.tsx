import { cn } from '@/lib/utils';

function Panel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-base-100 text-base-content rounded-box border border-base-300 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

// Шапка панели
function PanelHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-6 border-b border-base-300',
        className,
      )}
      {...props}
    />
  );
}

// Подзаголовок/описание
function PanelSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p className={cn('text-base-content/70 text-sm', className)} {...props} />
  );
}

// Основное содержимое
function PanelBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('p-6', className)} {...props} />;
}

// Футер панели
function PanelFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 p-6 border-t border-base-300',
        className,
      )}
      {...props}
    />
  );
}

// Действие в шапке (для кнопок и т.д.)
function PanelAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props} />
  );
}

export {
  Panel,
  PanelHeader,
  PanelSubtitle,
  PanelBody,
  PanelFooter,
  PanelAction,
};
