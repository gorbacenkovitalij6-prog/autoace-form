'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Fireworks from '@/components/Fireworks';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  telegram: z.string().min(1, 'Укажите ваш Telegram (@username или номер телефона)'),
  phone: z.string().optional(),
  brand: z.string().min(1, 'Выберите марку'),
  model: z.string().min(1, 'Укажите модель'),
  year: z.string().min(1, 'Укажите год'),
  color: z.string().optional(),
  mileage: z.string().optional(),
  transmission: z.string().min(1, 'Выберите тип коробки'),
  fuelType: z.string().min(1, 'Выберите тип топлива'),
  driveType: z.string().min(1, 'Выберите тип привода'),
  budget: z.string().min(1, 'Укажите бюджет'),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AutoSurveyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showFireworks, setShowFireworks] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      telegram: '',
      phone: '',
      brand: '',
      model: '',
      year: '',
      color: '',
      mileage: '',
      transmission: '',
      fuelType: '',
      driveType: '',
      budget: '',
      additionalInfo: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      setShowFireworks(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />
      <Card className="shadow-2xl border-4 border-yellow-400/60 bg-gradient-to-br from-green-800/85 via-red-900/85 to-green-800/85 backdrop-blur-lg">
      <CardHeader className="border-b-2 border-yellow-400/40">
        <CardTitle className="text-4xl text-center text-yellow-300 font-bold drop-shadow-xl" style={{
          textShadow: '0 0 15px rgba(255,215,0,1), 0 0 25px rgba(255,215,0,0.5), 3px 3px 6px rgba(0,0,0,0.8)'
        }}>
          Анкета подбора автомобиля
        </CardTitle>
        <CardDescription className="text-white text-center text-lg font-medium drop-shadow-md">
          Заполните все поля, чтобы мы могли подобрать для вас лучший вариант
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Контактная информация */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-300" style={{
                textShadow: '0 0 10px rgba(255,215,0,0.6)'
              }}>
                Контактная информация
              </h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя *</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-cyan-400"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z"
                          fill="currentColor"
                        />
                      </svg>
                      Telegram контакт *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@ваш_username или номер телефона"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-yellow-100/80 mt-1 font-medium">
                      Введите @username или номер телефона из Telegram
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон (опционально)</FormLabel>
                    <FormControl>
                      <Input placeholder="+7 (999) 123-45-67" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Информация об автомобиле */}
            <div className="space-y-4 pt-4 border-t border-yellow-400/30">
              <h3 className="text-xl font-bold text-yellow-300" style={{
                textShadow: '0 0 10px rgba(255,215,0,0.6)'
              }}>
                Интересующий автомобиль
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Марка *</FormLabel>
                      <FormControl>
                        <Input placeholder="Toyota, BMW, Mercedes..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Модель *</FormLabel>
                      <FormControl>
                        <Input placeholder="Camry, X5, E-Class..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Год выпуска *</FormLabel>
                      <FormControl>
                        <Input placeholder="2020-2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цвет (опционально)</FormLabel>
                      <FormControl>
                        <Input placeholder="Черный, белый, серый..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пробег (опционально)</FormLabel>
                    <FormControl>
                      <Input placeholder="до 50 000 км" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Технические характеристики */}
            <div className="space-y-4 pt-4 border-t border-yellow-400/30">
              <h3 className="text-xl font-bold text-yellow-300" style={{
                textShadow: '0 0 10px rgba(255,215,0,0.6)'
              }}>
                Технические характеристики
              </h3>

              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Коробка передач *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип коробки" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Автоматическая</SelectItem>
                        <SelectItem value="manual">Механическая</SelectItem>
                        <SelectItem value="robot">Робот</SelectItem>
                        <SelectItem value="cvt">Вариатор</SelectItem>
                        <SelectItem value="any">Любая</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип топлива *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип топлива" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gasoline">Бензин</SelectItem>
                        <SelectItem value="diesel">Дизель</SelectItem>
                        <SelectItem value="hybrid">Гибрид</SelectItem>
                        <SelectItem value="electric">Электро</SelectItem>
                        <SelectItem value="gas">Газ</SelectItem>
                        <SelectItem value="any">Любой</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип привода *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип привода" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fwd">Передний</SelectItem>
                        <SelectItem value="rwd">Задний</SelectItem>
                        <SelectItem value="awd">Полный</SelectItem>
                        <SelectItem value="any">Любой</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Бюджет *</FormLabel>
                    <FormControl>
                      <Input placeholder="1 000 000 - 2 000 000 руб" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Дополнительная информация */}
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дополнительные пожелания (опционально)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Укажите любые дополнительные требования или пожелания..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-900/50 backdrop-blur-sm text-yellow-300 p-4 rounded-lg border-2 border-yellow-400/70">
                <div>
                  <p className="font-bold mb-1 text-lg">Заявка успешно отправлена!</p>
                  <p className="text-sm text-white/90">Спасибо за обращение. Мы свяжемся с вами в ближайшее время. С Новым Годом!</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900/70 backdrop-blur-sm text-yellow-200 p-4 rounded-lg border-2 border-red-500/70">
                <div>
                  <p className="font-semibold mb-1">Ошибка отправки</p>
                  <p className="text-sm">Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-green-700 hover:from-red-700 hover:to-green-800 text-white font-bold text-lg border-2 border-yellow-400/50 shadow-lg glow-effect"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </>
  );
}
