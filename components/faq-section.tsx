import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from 'react-i18next'

export function FaqSection() {
  const { t } = useTranslation()
  
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">{t('faq.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t('faq.q1')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a1') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>{t('faq.q2')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a2') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>{t('faq.q3')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a3') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>{t('faq.q4')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a4') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>{t('faq.q5')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a5') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>{t('faq.q6')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a6') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>{t('faq.q7')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a7') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>{t('faq.q8')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a8') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>{t('faq.q9')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a9') }} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>{t('faq.q10')}</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: t('faq.a10') }} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
