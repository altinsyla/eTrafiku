import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Përshëndetje! Jam asistenti juaj i e-KOSOVA-s. Si mund t’ju ndihmoj me nevojat tuaja për udhëtim sot?',
    sender: 'ai',
    timestamp: new Date()
  }
];

const RESPONSES: Record<string, string[]> = {
  'ticket': [
    'Biletat mund t’i blini përmes aplikacionit tonë ose në çdo kioskë në stacion. Dëshironi t’ju ndihmoj të gjeni vendndodhjen më të afërt?',
    'Biletat mund të blihen deri në 30 ditë përpara. Ju duhet informacion për ndonjë linjë specifike?',
    'Ne ofrojmë bileta të vetme, ditore dhe mujore. Cila ju intereson?'
  ],
  'route': [
    'Ne kemi shumë linja që lidhin të gjitha qytetet kryesore në Kosovë. Ndërmjet cilëve qytete jeni duke udhëtuar?',
    'Linjat më të njohura janë Prishtinë-Mitrovicë, Prishtinë-Gjilan dhe Prishtinë-Pejë. Ju nevojitet orari për ndonjërën?',
    'Informacioni për linjat është i përditësuar në kohë reale në hartën tonë. Mund të kërkoni edhe për linja në Planifikuesin e Udhëtimit.'
  ],
  'schedule': [
    'Shumica e autobusëve nisen nga ora 05:00 deri në 23:00. Trenat kanë orare më të kufizuara. T’ju ndihmoj të gjeni një orar të caktuar?',
    'Orari i fundjavës ndryshon nga ai i ditëve të javës, me më pak frekuencë. Dëshironi të shihni orarin për një linjë të caktuar?',
    'Gjithmonë mund të kontrolloni informacionin më të fundit për oraret në faqen tonë ose në aplikacion.'
  ],
  'discount': [
    'Ne ofrojmë zbritje për studentët, pensionistët dhe fëmijët nën 12 vjeç. A hyni në ndonjë prej këtyre kategorive?',
    'Biletat mujore ofrojnë kursime të mëdha në krahasim me ato të vetme nëse udhëtoni rregullisht.',
    'Zbritjet për grupe janë të disponueshme për 10 ose më shumë persona që udhëtojnë së bashku.'
  ],
  'pristina': [
    'Prishtina është qendra jonë kryesore, me lidhje për të gjitha qytetet kryesore në Kosovë.',
    'Stacioni Qendror i Prishtinës ka hapësira pritjeje, kafene dhe zyra për bileta.',
    'Nga Prishtina mund të arrini në Mitrovicë për rreth 90 minuta me autobus.'
  ],
  'mitrovica': [
    'Linja Prishtinë-Mitrovicë është një nga më të shpeshtat, me autobusë çdo orë gjatë orëve të pikut.',
    'Udhëtimi nga Prishtina në Mitrovicë zgjat rreth 90 minuta, në varësi të trafikut.',
    'Terminali i autobusëve në Mitrovicë ndodhet në qendër të qytetit dhe është i përshtatshëm për udhëtime të tjera.'
  ],
  'help': [
    'Mund t’ju ndihmoj me informacione për linjat, oraret, çmimet e biletave dhe këshilla të përgjithshme për udhëtim. Me çfarë keni nevojë për ndihmë?',
    'Nëse keni nevojë për ndihmë urgjente, mund të telefononi shërbimin për klientë në +383 44 123 456.',
    'Për gjësende të humbura, ju lutem kontaktoni terminalin ku besoni se i keni humbur.'
  ]
};

const generateResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  for (const [keyword, responses] of Object.entries(RESPONSES)) {
    if (lowercaseMessage.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  const defaultResponses = [
    'Jam këtu për t’ju ndihmuar me nevojat tuaja për transport. Mund të më jepni më shumë detaje?',
    'Mund t’ju ndihmoj me informata për linja, orare dhe bileta. Çka dëshironi të dini?',
    'Mos hezitoni të pyesni për ndonjë linjë, orar apo shërbim specifik që ofrojmë në Kosovë.'
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Asistenti e-KOSOVA</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Shkruani mesazhin tuaj..."
              className="flex-1"
            />
            <Button onClick={handleSend}>Dërgo</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIAssistant;
