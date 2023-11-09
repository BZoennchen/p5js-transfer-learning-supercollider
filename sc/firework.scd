s.boot;

(
SynthDef(\fireworks,{
    var sig;
    sig = Dust.ar([\densityleft.kr(3), \densityright.kr(3)-0.5]);
	sig = Ringz.ar(
		sig,
		freq: \freq.kr(300),
		decaytime: \decaytime.kr(0.1)) * \amp.kr(0.55);
    sig = FreeVerb.ar(sig, 0.6, 0.9, 0.8);
    sig = LPF.ar(in: sig, freq: \cutofffreq.kr(21000));
    Out.ar(0, sig);
}).add;
)


~fireworks = Synth(\fireworks);
~fireworks.set(\amp, 1);
~fireworks.set(\densityleft, 20);
~fireworks.set(\freq, 400);
~fireworks.set(\decaytime, 0.3);
~fireworks.free();

(
OSCdef(
    \getClass,
    {
        arg val;
		val.postln;
		if(val[1] == 'class1',{
			~fireworks.set(\freq, 200);
		}, {
			~fireworks.set(\freq, 500);
		});

    },
    '/wek/outputs',
    recvPort: 7448
);
)

OSCFunc.trace(false);